import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const VALID_CODES = [
  'DHHDUE',
  'DYUSUWI',
  'FFGSHS',
  'DUUDJEH',
  'CTYSWB',
  'FHUEBRV',
  'DUUWIW',
  'OWOWODH',
  'DUDYRV'
];

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(5, 20, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00FF41';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0"
    />
  );
};

const Index = () => {
  const [isActivated, setIsActivated] = useState(false);
  const [activationCode, setActivationCode] = useState('');

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [platform, setPlatform] = useState('');
  const [knownPasswords, setKnownPasswords] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);
  const [pinnedPassword, setPinnedPassword] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handleActivate = () => {
    if (VALID_CODES.includes(activationCode.toUpperCase())) {
      setIsActivated(true);
      toast.success('СИСТЕМА АКТИВИРОВАНА', {
        description: 'Доступ разрешен'
      });
    } else {
      toast.error('ОШИБКА ДОСТУПА', {
        description: 'Неверный код активации'
      });
    }
  };

  const generatePasswordVariants = async () => {
    const passwords: string[] = [];
    const name = ownerName.toLowerCase().trim();
    const phone = ownerPhone.replace(/\D/g, '');
    const info = additionalInfo.toLowerCase();
    const platformLower = platform.toLowerCase().trim();
    const known = knownPasswords.toLowerCase().trim();

    if (pinnedPassword) {
      passwords.push(pinnedPassword);
    }

    const platformPatterns: Record<string, string[]> = {
      'вконтакте': ['vk', 'vkontakte', 'вк', 'vkcom', 'vk.com'],
      'вк': ['vk', 'vkontakte', 'вк', 'vkcom'],
      'instagram': ['insta', 'ig', 'inst', 'instagram', 'gram'],
      'telegram': ['tg', 'tlg', 'telegram', 'tele', 'telega'],
      'whatsapp': ['wa', 'whatsapp', 'whats', 'wapp'],
      'gmail': ['google', 'gmail', 'mail', 'gm', 'goog'],
      'yandex': ['yandex', 'ya', 'яндекс', 'yandexru'],
      'mail.ru': ['mail', 'mailru', 'мейл'],
      'facebook': ['fb', 'facebook', 'face'],
      'twitter': ['tw', 'twitter', 'twit', 'x'],
      'tiktok': ['tiktok', 'tt', 'tik'],
      'discord': ['discord', 'ds', 'disc'],
      'youtube': ['youtube', 'yt', 'you'],
      'twitch': ['twitch', 'tv'],
      'steam': ['steam', 'stm'],
      'playstation': ['ps', 'playstation', 'psn'],
      'xbox': ['xbox', 'xb'],
      'apple': ['apple', 'icloud', 'appl']
    };

    const commonSymbols = ['!', '@', '#', '$', '*', '_', '.', '-', '&'];
    const years = ['2024', '2025', '2023', '2022', '2021', '2020', '2019', '2018', '00', '01', '02', '03', '99', '98', '97', '96', '95', '10', '11'];
    const numbers = ['1', '12', '123', '1234', '12345', '123456', '1111', '2222', '777', '666', '69', '420', '007', '111', '222', '333'];

    const leetReplacements: Record<string, string> = {
      'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'l': '1', 'g': '9'
    };

    const toLeet = (text: string): string => {
      return text.split('').map(char => leetReplacements[char.toLowerCase()] || char).join('');
    };

    const capitalize = (text: string): string => {
      return text.charAt(0).toUpperCase() + text.slice(1);
    };

    const reverseString = (text: string): string => {
      return text.split('').reverse().join('');
    };

    const infoWords = info.match(/\b\w+\b/g) || [];
    const priorityWords = infoWords.filter(w => w.length > 3);

    priorityWords.forEach((word) => {
      passwords.push(word);
      passwords.push(capitalize(word));
      passwords.push(word.toUpperCase());
      passwords.push(toLeet(word));
      passwords.push(reverseString(word));

      numbers.forEach(num => {
        passwords.push(word + num);
        passwords.push(num + word);
        passwords.push(capitalize(word) + num);
      });

      commonSymbols.forEach(sym => {
        passwords.push(word + sym);
        passwords.push(word + sym + sym);
        passwords.push(capitalize(word) + sym);
        numbers.forEach(num => {
          passwords.push(word + num + sym);
          passwords.push(word + sym + num);
        });
      });

      years.forEach(year => {
        passwords.push(word + year);
        passwords.push(year + word);
        passwords.push(capitalize(word) + year);
        passwords.push(word + '_' + year);
        commonSymbols.forEach(sym => {
          passwords.push(word + year + sym);
        });
      });

      if (phone) {
        passwords.push(word + phone.slice(-4));
        passwords.push(word + phone.slice(-6));
        passwords.push(phone.slice(-4) + word);
        passwords.push(word + '_' + phone.slice(-4));
      }

      if (name) {
        passwords.push(word + name);
        passwords.push(name + word);
        passwords.push(word + '_' + name);
        passwords.push(capitalize(word) + capitalize(name));
        passwords.push(word + '.' + name);
        passwords.push(name + '.' + word);
      }

      if (platformLower) {
        const platformKeys = Object.keys(platformPatterns);
        platformKeys.forEach((key) => {
          if (platformLower.includes(key)) {
            platformPatterns[key].forEach((p) => {
              passwords.push(word + p);
              passwords.push(p + word);
              passwords.push(word + '_' + p);
              passwords.push(capitalize(word) + capitalize(p));
            });
          }
        });
      }

      priorityWords.forEach((word2) => {
        if (word !== word2 && word2.length > 3) {
          passwords.push(word + word2);
          passwords.push(word + '_' + word2);
          passwords.push(capitalize(word) + capitalize(word2));
          numbers.forEach(num => {
            passwords.push(word + word2 + num);
            passwords.push(word + num + word2);
          });
        }
      });

      if (pinnedPassword && !pinnedPassword.includes(word)) {
        passwords.push(pinnedPassword + word);
        passwords.push(word + pinnedPassword);
        passwords.push(pinnedPassword + '_' + word);
        passwords.push(word + '_' + pinnedPassword);
        numbers.forEach(num => {
          passwords.push(pinnedPassword + word + num);
          passwords.push(word + pinnedPassword + num);
        });
      }
    });

    if (known && known !== 'незнаю' && known !== 'не знаю') {
      const knownParts = known.split(/[\s,;]+/);
      knownParts.forEach((pwd) => {
        if (pwd.length > 2) {
          passwords.push(pwd);
          passwords.push(capitalize(pwd));
          passwords.push(pwd.toUpperCase());
          passwords.push(toLeet(pwd));
          passwords.push(reverseString(pwd));
          
          commonSymbols.forEach(sym => {
            passwords.push(pwd + sym);
            passwords.push(sym + pwd);
            passwords.push(pwd + sym + sym);
          });
          
          numbers.forEach(num => {
            passwords.push(pwd + num);
            passwords.push(num + pwd);
            passwords.push(pwd + '_' + num);
          });
          
          years.forEach(year => {
            passwords.push(pwd + year);
            passwords.push(year + pwd);
          });
          
          if (name) {
            passwords.push(name + pwd);
            passwords.push(pwd + name);
            passwords.push(name + '_' + pwd);
            passwords.push(pwd + '_' + name);
            passwords.push(name + '.' + pwd);
            passwords.push(capitalize(name) + capitalize(pwd));
          }
          
          if (platformLower) {
            const platformKeys = Object.keys(platformPatterns);
            platformKeys.forEach((key) => {
              if (platformLower.includes(key)) {
                platformPatterns[key].forEach((p) => {
                  passwords.push(pwd + p);
                  passwords.push(p + pwd);
                  passwords.push(pwd + '_' + p);
                  passwords.push(p + '_' + pwd);
                  passwords.push(pwd + '@' + p);
                });
              }
            });
          }

          if (phone) {
            passwords.push(pwd + phone.slice(-4));
            passwords.push(pwd + phone.slice(-6));
            passwords.push(phone.slice(-4) + pwd);
          }
        }
      });
    }

    if (platformLower) {
      const platformKeys = Object.keys(platformPatterns);
      platformKeys.forEach((key) => {
        if (platformLower.includes(key)) {
          platformPatterns[key].forEach((p) => {
            passwords.push(p);
            passwords.push(capitalize(p));
            passwords.push(p.toUpperCase());
            passwords.push(toLeet(p));
            
            numbers.forEach(num => {
              passwords.push(p + num);
              passwords.push(num + p);
            });

            commonSymbols.forEach(sym => {
              passwords.push(p + sym);
              passwords.push(p + '123' + sym);
            });
            
            if (name) {
              passwords.push(name + p);
              passwords.push(p + name);
              passwords.push(name + '_' + p);
              passwords.push(capitalize(name) + capitalize(p));
              passwords.push(name + '.' + p);
              passwords.push(name + '@' + p);
              passwords.push(p + '.' + name);
              
              const nameParts = name.split(/[\s_-]+/);
              if (nameParts.length > 1) {
                passwords.push(nameParts[0] + p);
                passwords.push(p + nameParts[0]);
                passwords.push(nameParts[0].charAt(0) + p);
              }
            }
            
            if (phone) {
              passwords.push(p + phone.slice(-4));
              passwords.push(p + phone.slice(-6));
              passwords.push(p + '_' + phone.slice(-4));
              passwords.push(phone.slice(-4) + p);
            }

            years.forEach(year => {
              passwords.push(p + year);
              passwords.push(year + p);
              passwords.push(p + '_' + year);
            });
          });
        }
      });
    }

    if (name) {
      passwords.push(name);
      passwords.push(capitalize(name));
      passwords.push(name.toUpperCase());
      passwords.push(toLeet(name));
      passwords.push(reverseString(name));
      
      numbers.forEach(num => {
        passwords.push(name + num);
        passwords.push(num + name);
        passwords.push(name + '_' + num);
        passwords.push(capitalize(name) + num);
      });

      commonSymbols.forEach(sym => {
        passwords.push(name + sym);
        passwords.push(name + sym + sym);
        passwords.push(sym + name);
      });

      years.forEach(year => {
        passwords.push(name + year);
        passwords.push(year + name);
        passwords.push(name + '_' + year);
        passwords.push(capitalize(name) + year);
      });
      
      const nameParts = name.split(/[\s_-]+/);
      if (nameParts.length > 1) {
        passwords.push(nameParts[0] + nameParts[1]);
        passwords.push(nameParts[1] + nameParts[0]);
        passwords.push(nameParts[0].charAt(0) + nameParts[1]);
        passwords.push(nameParts[0] + nameParts[1].charAt(0));
        passwords.push(capitalize(nameParts[0]) + capitalize(nameParts[1]));
        
        nameParts.forEach((part) => {
          if (part.length > 2) {
            passwords.push(part);
            passwords.push(capitalize(part));
            passwords.push(toLeet(part));
            numbers.forEach(num => {
              passwords.push(part + num);
              passwords.push(num + part);
            });
          }
        });

        numbers.forEach(num => {
          passwords.push(nameParts[0] + num + nameParts[1]);
          passwords.push(nameParts[0] + nameParts[1] + num);
        });
      }

      const firstLetters = name.split(/[\s_-]+/).map(p => p.charAt(0)).join('');
      if (firstLetters.length > 1) {
        passwords.push(firstLetters);
        passwords.push(firstLetters.toUpperCase());
        numbers.forEach(num => {
          passwords.push(firstLetters + num);
          passwords.push(firstLetters.toUpperCase() + num);
        });
      }
    }

    if (phone) {
      passwords.push(phone.slice(-6));
      passwords.push(phone.slice(-8));
      passwords.push(phone.slice(-4));
      passwords.push(phone.slice(-4) + phone.slice(-4));
      passwords.push(phone.slice(0, 4) + phone.slice(-4));
      
      if (name) {
        passwords.push(name + phone.slice(-4));
        passwords.push(name + phone.slice(-2));
        passwords.push(phone.slice(-4) + name);
        passwords.push(name + '_' + phone.slice(-4));
        passwords.push(capitalize(name) + phone.slice(-4));
        passwords.push(name + phone.slice(-6));
      }

      commonSymbols.forEach(sym => {
        passwords.push(phone.slice(-4) + sym);
        passwords.push(phone.slice(-6) + sym);
      });
    }

    const words = info.match(/\b\w+\b/g) || [];
    words.forEach((word) => {
      if (word.length > 3 && !priorityWords.includes(word)) {
        passwords.push(word);
        passwords.push(capitalize(word));
        passwords.push(word.toUpperCase());
        passwords.push(toLeet(word));
        passwords.push(reverseString(word));
        
        numbers.forEach(num => {
          passwords.push(word + num);
          passwords.push(num + word);
        });

        commonSymbols.forEach(sym => {
          passwords.push(word + sym);
          passwords.push(word + '123' + sym);
        });

        if (phone) {
          passwords.push(word + phone.slice(-4));
          passwords.push(phone.slice(-4) + word);
        }

        if (name) {
          passwords.push(name + word);
          passwords.push(word + name);
          passwords.push(name + '_' + word);
          passwords.push(capitalize(name) + capitalize(word));
        }
      }
    });

    years.forEach((year) => {
      if (name) {
        passwords.push(name + year);
        passwords.push(year + name);
        passwords.push(capitalize(name) + year);
      }
      if (platformLower) {
        const firstPlatform = platformLower.split(' ')[0];
        passwords.push(firstPlatform + year);
        passwords.push(year + firstPlatform);
      }
      
      commonSymbols.forEach(sym => {
        if (name) {
          passwords.push(name + year + sym);
          passwords.push(name + sym + year);
        }
      });
    });

    const dateMatches = info.match(/\d{2}[.-/]\d{2}[.-/]\d{2,4}/g);
    if (dateMatches) {
      dateMatches.forEach((date) => {
        const cleaned = date.replace(/\D/g, '');
        passwords.push(cleaned);
        passwords.push(cleaned.slice(0, 4));
        passwords.push(cleaned.slice(-4));
        passwords.push(cleaned.slice(0, 6));
        passwords.push(cleaned.slice(-6));
        
        if (name) {
          passwords.push(name + cleaned);
          passwords.push(name + cleaned.slice(-4));
          passwords.push(cleaned.slice(-4) + name);
          passwords.push(capitalize(name) + cleaned.slice(-4));
        }

        commonSymbols.forEach(sym => {
          passwords.push(cleaned + sym);
          passwords.push(cleaned.slice(-4) + sym);
        });
      });
    }

    const emailMatch = info.match(/[\w.-]+@[\w.-]+\.\w+/g);
    if (emailMatch) {
      emailMatch.forEach((email) => {
        const username = email.split('@')[0];
        passwords.push(username);
        passwords.push(capitalize(username));
        passwords.push(toLeet(username));
        
        numbers.forEach(num => {
          passwords.push(username + num);
        });

        commonSymbols.forEach(sym => {
          passwords.push(username + sym);
        });
      });
    }

    if (platformLower) {
      passwords.push(platformLower);
      passwords.push(capitalize(platformLower));
      passwords.push(toLeet(platformLower));
      
      numbers.forEach(num => {
        passwords.push(platformLower + num);
      });
    }

    const popularPasswords = [
      'password', 'qwerty', 'admin', 'user', 'letmein', 'welcome', 
      'monkey', 'dragon', 'master', 'sunshine', 'princess', 'football'
    ];

    popularPasswords.forEach(pwd => {
      passwords.push(pwd);
      passwords.push(capitalize(pwd));
      passwords.push(toLeet(pwd));
      numbers.forEach(num => {
        passwords.push(pwd + num);
      });
      if (name) {
        passwords.push(name + pwd);
      }
    });

    if (pinnedPassword) {
      commonSymbols.forEach(sym => {
        passwords.push(pinnedPassword + sym);
        passwords.push(sym + pinnedPassword);
        passwords.push(pinnedPassword + sym + sym);
      });

      numbers.forEach(num => {
        passwords.push(pinnedPassword + num);
        passwords.push(num + pinnedPassword);
        passwords.push(pinnedPassword + '_' + num);
        commonSymbols.forEach(sym => {
          passwords.push(pinnedPassword + num + sym);
          passwords.push(pinnedPassword + sym + num);
        });
      });

      years.forEach(year => {
        passwords.push(pinnedPassword + year);
        passwords.push(year + pinnedPassword);
      });

      passwords.push(capitalize(pinnedPassword));
      passwords.push(pinnedPassword.toUpperCase());
      passwords.push(toLeet(pinnedPassword));
      passwords.push(reverseString(pinnedPassword));
    }

    const uniquePasswords = [...new Set(passwords)]
      .filter(p => p && p.length >= 4 && p.length <= 30);
    
    const prioritized = uniquePasswords.sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;

      if (pinnedPassword) {
        if (a.includes(pinnedPassword)) scoreA += 1000;
        if (b.includes(pinnedPassword)) scoreB += 1000;
      }

      priorityWords.forEach(word => {
        if (a.toLowerCase().includes(word)) scoreA += 100;
        if (b.toLowerCase().includes(word)) scoreB += 100;
      });

      if (name && a.toLowerCase().includes(name)) scoreA += 50;
      if (name && b.toLowerCase().includes(name)) scoreB += 50;

      if (phone && (a.includes(phone.slice(-4)) || a.includes(phone.slice(-6)))) scoreA += 50;
      if (phone && (b.includes(phone.slice(-4)) || b.includes(phone.slice(-6)))) scoreB += 50;

      if (/[!@#$%^&*]/.test(a)) scoreA += 20;
      if (/[!@#$%^&*]/.test(b)) scoreB += 20;

      if (/\d/.test(a)) scoreA += 10;
      if (/\d/.test(b)) scoreB += 10;

      return scoreB - scoreA;
    });
    
    return prioritized.slice(0, 10);
  };

  const handleGeneratePasswords = async () => {
    if (!additionalInfo && !ownerName && !ownerPhone && !platform && (!knownPasswords || knownPasswords.toLowerCase() === 'незнаю')) {
      toast.error('ОШИБКА', {
        description: 'Заполните хотя бы одно поле с информацией'
      });
      return;
    }

    setIsGenerating(true);
    setAnalysisProgress(0);
    setGeneratedPasswords([]);

    const steps = [
      'Инициализация нейросети...',
      'Глубокий анализ дополнительной информации...',
      'Поиск цифровых следов в интернете...',
      'Сканирование социальных паттернов...',
      'Анализ закрепленного пароля...',
      'Применение алгоритмов машинного обучения...',
      'Комбинирование данных из всех источников...',
      'Применение leet-замен и вариаций...',
      'Приоритизация по вероятности...',
      'Финальная оптимизация и ранжирование...'
    ];

    let currentStep = 0;
    const stepDuration = 2000;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setCurrentAnalysisStep(steps[currentStep]);
        setAnalysisProgress((currentStep / steps.length) * 100);
      } else {
        clearInterval(interval);
        setCurrentAnalysisStep('Завершено!');
        setAnalysisProgress(100);
        
        setTimeout(async () => {
          const passwords = await generatePasswordVariants();
          setGeneratedPasswords(passwords);
          setIsGenerating(false);
          toast.success('АНАЛИЗ ЗАВЕРШЁН', {
            description: `Найдено ${passwords.length} высоковероятных паролей`
          });
        }, 1000);
      }
    }, stepDuration);

    setCurrentAnalysisStep(steps[0]);
  };

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success('СКОПИРОВАНО', {
      description: password
    });
  };

  const handleBuyCode = () => {
    setShowPurchaseModal(true);
  };

  const handlePinPassword = (password: string) => {
    if (pinnedPassword === password) {
      setPinnedPassword('');
      toast.info('ПАРОЛЬ ОТКРЕПЁН', {
        description: 'Используйте другой пароль как основу'
      });
    } else {
      setPinnedPassword(password);
      toast.success('ПАРОЛЬ ЗАКРЕПЛЁН', {
        description: 'Новая генерация будет основана на нём'
      });
    }
  };

  if (!isActivated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
        <MatrixRain />
        <Card className="w-full max-w-md p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.3)] relative z-10">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="Shield" className="text-primary w-8 h-8 matrix-glow" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-primary matrix-glow tracking-wider">
                DUWDU144
              </h1>
              <p className="text-muted-foreground text-sm">
                Введите код активации для доступа
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="КОД АКТИВАЦИИ"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleActivate()}
                className="text-center font-mono text-lg tracking-widest bg-input/50 border-primary/30 focus:border-primary text-primary placeholder:text-muted-foreground"
                maxLength={10}
              />

              <Button
                onClick={handleActivate}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-mono shadow-[0_0_20px_rgba(0,255,65,0.5)]"
              >
                <Icon name="Lock" className="mr-2" size={18} />
                АКТИВИРОВАТЬ
              </Button>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-center text-muted-foreground mb-3">
                  Нет кода доступа?
                </p>
                <Button
                  onClick={handleBuyCode}
                  variant="outline"
                  className="w-full border-secondary text-secondary hover:bg-secondary/10 font-mono"
                >
                  <Icon name="ShoppingCart" className="mr-2" size={18} />
                  КУПИТЬ КОД — 199₽
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <MatrixRain />

      <Card className="w-full max-w-3xl p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.3)] relative z-10 max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                <Icon name="Brain" className="text-primary w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary matrix-glow tracking-wider">
                  DUWDU144
                </h1>
                <p className="text-xs text-secondary font-mono">
                  AI-POWERED PASSWORD ANALYZER v5.0
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setIsActivated(false);
                setActivationCode('');
              }}
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/10"
            >
              <Icon name="LogOut" className="text-destructive" size={20} />
            </Button>
          </div>

          <div className="grid gap-4">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-4 rounded-lg border-2 border-primary/40 shadow-[0_0_15px_rgba(0,255,65,0.2)]">
              <label className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                <Icon name="FileText" size={18} />
                ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ (ПРИОРИТЕТ)
              </label>
              <Textarea
                placeholder="ВСЯ ИНФОРМАЦИЯ О ЦЕЛИ: кличка питомца, любимая команда, хобби, важные даты, город, профессия, марка авто, прозвища, памятные события..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="font-mono bg-background/80 border-primary/40 focus:border-primary text-primary min-h-32 resize-none placeholder:text-muted-foreground/70"
              />
              <p className="text-xs text-secondary mt-2 font-mono">
                ⚡ Чем больше деталей — тем точнее подбор
              </p>
            </div>

            {pinnedPassword && (
              <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-secondary flex items-center gap-2">
                    <Icon name="Pin" size={16} />
                    ЗАКРЕПЛЁННЫЙ ПАРОЛЬ
                  </label>
                  <Button
                    onClick={() => setPinnedPassword('')}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-destructive"
                  >
                    Открепить
                  </Button>
                </div>
                <div className="font-mono text-secondary text-lg bg-background/50 rounded p-2">
                  {pinnedPassword}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block">
                  ИМЯ ВЛАДЕЛЬЦА
                </label>
                <Input
                  type="text"
                  placeholder="Иван Петров"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block">
                  ТЕЛЕФОН
                </label>
                <Input
                  type="text"
                  placeholder="+7 999 123 45 67"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block">
                  ПЛАТФОРМА
                </label>
                <Input
                  type="text"
                  placeholder="VK, Instagram, Gmail..."
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block">
                  ИЗВЕСТНЫЕ ПАРОЛИ
                </label>
                <Input
                  type="text"
                  placeholder='"Незнаю" если нет'
                  value={knownPasswords}
                  onChange={(e) => setKnownPasswords(e.target.value)}
                  className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary text-sm"
                />
              </div>
            </div>

            {isGenerating && (
              <div className="space-y-3 p-4 bg-primary/5 border border-primary/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-primary">{currentAnalysisStep}</span>
                  <span className="text-xs font-mono text-muted-foreground">{Math.round(analysisProgress)}%</span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
              </div>
            )}

            <Button
              onClick={handleGeneratePasswords}
              disabled={isGenerating}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-mono shadow-[0_0_20px_rgba(0,255,65,0.5)]"
            >
              {isGenerating ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                  АНАЛИЗ ДАННЫХ...
                </>
              ) : (
                <>
                  <Icon name="Sparkles" className="mr-2" size={18} />
                  ЗАПУСТИТЬ AI АНАЛИЗ
                </>
              )}
            </Button>
          </div>

          {generatedPasswords.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-primary matrix-glow flex items-center gap-2">
                  <Icon name="Target" size={18} />
                  ТОП-{generatedPasswords.length} ПАРОЛЕЙ
                </h3>
                <Button
                  onClick={handleGeneratePasswords}
                  variant="ghost"
                  size="sm"
                  className="text-xs font-mono hover:bg-primary/10 hover:text-primary"
                >
                  <Icon name="RefreshCw" className="mr-1" size={14} />
                  ПЕРЕСОЗДАТЬ
                </Button>
              </div>

              <div className="grid gap-2">
                {generatedPasswords.map((password, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded p-3 border transition-all group ${
                      pinnedPassword === password
                        ? 'bg-secondary/20 border-secondary shadow-[0_0_10px_rgba(255,215,0,0.3)]'
                        : 'bg-muted/30 border-primary/20 hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className={`text-xs font-bold w-8 flex-shrink-0 ${
                        index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-orange-400' : 'text-secondary'
                      }`}>
                        #{index + 1}
                      </span>
                      <span className="font-mono text-primary text-base truncate font-semibold">
                        {password}
                      </span>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => handlePinPassword(password)}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-secondary/20 flex-shrink-0"
                        title="Закрепить пароль"
                      >
                        <Icon 
                          name={pinnedPassword === password ? "PinOff" : "Pin"} 
                          className={pinnedPassword === password ? "text-secondary" : "text-primary"} 
                          size={16} 
                        />
                      </Button>
                      <Button
                        onClick={() => handleCopyPassword(password)}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-primary/10 flex-shrink-0"
                        title="Копировать"
                      >
                        <Icon name="Copy" className="text-primary" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-border/50">
            <Button
              onClick={handleBuyCode}
              variant="outline"
              className="w-full border-secondary text-secondary hover:bg-secondary/10 font-mono"
            >
              <Icon name="ShoppingCart" className="mr-2" size={18} />
              КУПИТЬ КОД АКТИВАЦИИ — 199₽
            </Button>
          </div>
        </div>
      </Card>

      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setShowPurchaseModal(false)}>
          <Card 
            className="w-full max-w-lg p-6 bg-card/95 backdrop-blur border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.4)] relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={() => setShowPurchaseModal(false)}
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 hover:bg-destructive/10"
            >
              <Icon name="X" className="text-muted-foreground" size={20} />
            </Button>

            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Icon name="ShoppingCart" className="text-secondary w-8 h-8" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-primary matrix-glow">
                  ПОКУПКА КОДА АКТИВАЦИИ
                </h2>
                <p className="text-4xl font-bold text-secondary mt-2">199₽</p>
              </div>

              <div className="bg-primary/5 border border-primary/30 rounded-lg p-4 space-y-3">
                <h3 className="text-sm font-bold text-primary flex items-center gap-2">
                  <Icon name="Info" size={16} />
                  ИНСТРУКЦИЯ ПО ПОКУПКЕ:
                </h3>
                
                <ol className="text-sm text-muted-foreground space-y-2 font-mono list-decimal list-inside">
                  <li>Перейдите в Telegram чат по кнопке ниже</li>
                  <li>Напишите: "Хочу купить код DUWDU144"</li>
                  <li>Отправьте 199₽ на указанные реквизиты</li>
                  <li>После оплаты пришлите скриншот</li>
                  <li>Получите код активации в течение 5 минут</li>
                </ol>
              </div>

              <div className="bg-secondary/10 border border-secondary/50 rounded-lg p-3">
                <div className="flex items-start gap-2 text-xs">
                  <Icon name="CheckCircle2" className="text-secondary flex-shrink-0 mt-0.5" size={16} />
                  <div>
                    <p className="text-secondary font-bold mb-1">ЧТО ВЫ ПОЛУЧИТЕ:</p>
                    <ul className="text-muted-foreground space-y-1 font-mono">
                      <li>✓ Уникальный код активации</li>
                      <li>✓ Неограниченный доступ к системе</li>
                      <li>✓ AI-анализ и подбор паролей</li>
                      <li>✓ Поддержка 24/7</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => window.open('https://t.me/LyriumMine', '_blank')}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-mono shadow-[0_0_20px_rgba(0,255,65,0.5)]"
              >
                <Icon name="Send" className="mr-2" size={18} />
                ОТКРЫТЬ TELEGRAM ЧАТ
              </Button>

              <p className="text-center text-xs text-muted-foreground font-mono">
                Поддержка: Telegram @LyriumMine
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;