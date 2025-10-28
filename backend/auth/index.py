'''
Business: Аутентификация пользователей - проверка кодов активации, регистрация и вход
Args: event - dict с httpMethod, body, queryStringParameters
      context - объект с атрибутами request_id, function_name
Returns: HTTP response dict с данными пользователя или ошибкой
'''

import json
import os
import hashlib
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        try:
            if action == 'check_code':
                code = body_data.get('code', '').upper().strip()
                
                cursor.execute(
                    "SELECT is_used FROM activation_codes WHERE code = %s",
                    (code,)
                )
                result = cursor.fetchone()
                
                if not result:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Неверный код активации'})
                    }
                
                if result['is_used']:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Этот код уже использован'})
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'valid': True, 'code': code})
                }
            
            elif action == 'register':
                code = body_data.get('code', '').upper().strip()
                username = body_data.get('username', '').strip()
                password = body_data.get('password', '').strip()
                
                if not username or not password or len(username) < 3 or len(password) < 6:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Ник минимум 3 символа, пароль минимум 6 символов'})
                    }
                
                cursor.execute(
                    "SELECT is_used FROM activation_codes WHERE code = %s",
                    (code,)
                )
                code_result = cursor.fetchone()
                
                if not code_result or code_result['is_used']:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Код недействителен или уже использован'})
                    }
                
                cursor.execute(
                    "SELECT id FROM users WHERE username = %s",
                    (username,)
                )
                if cursor.fetchone():
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Этот ник уже занят'})
                    }
                
                password_hash = hash_password(password)
                
                cursor.execute(
                    "INSERT INTO users (username, password_hash, activation_code) VALUES (%s, %s, %s) RETURNING id",
                    (username, password_hash, code)
                )
                user_id = cursor.fetchone()['id']
                
                cursor.execute(
                    "UPDATE activation_codes SET is_used = TRUE, used_by_user_id = %s, used_at = CURRENT_TIMESTAMP WHERE code = %s",
                    (user_id, code)
                )
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'user': {'id': user_id, 'username': username}
                    })
                }
            
            elif action == 'login':
                username = body_data.get('username', '').strip()
                password = body_data.get('password', '').strip()
                
                password_hash = hash_password(password)
                
                cursor.execute(
                    "SELECT id, username FROM users WHERE username = %s AND password_hash = %s",
                    (username, password_hash)
                )
                user = cursor.fetchone()
                
                if not user:
                    return {
                        'statusCode': 401,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Неверный ник или пароль'})
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'user': {'id': user['id'], 'username': user['username']}
                    })
                }
            
            else:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неизвестное действие'})
                }
                
        except Exception as e:
            conn.rollback()
            return {
                'statusCode': 500,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'})
            }
        finally:
            cursor.close()
            conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }
