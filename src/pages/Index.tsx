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
  const [isMinimized, setIsMinimized] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const savedActivation = localStorage.getItem('codeHacker_activated');
    if (savedActivation === 'true') {
      setIsActivated(true);
    }
    const savedMinimized = localStorage.getItem('codeHacker_minimized');
    if (savedMinimized === 'true') {
      setIsMinimized(true);
    }
  }, []);

  const handleActivate = () => {
    if (VALID_CODES.includes(activationCode.toUpperCase())) {
      localStorage.setItem('codeHacker_activated', 'true');
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

  const generatePasswordVariants = () => {
    const passwords: string[] = [];
    const name = ownerName.toLowerCase();
    const phone = ownerPhone.replace(/\D/g, '');
    const info = additionalInfo.toLowerCase();

    const commonPatterns = ['123', '1234', '12345', '123456', '!', '@', '#'];
    const years = ['2024', '2025', '2023', '2022', '00', '01', '99'];

    if (name) {
      passwords.push(name);
      passwords.push(name + '123');
      passwords.push(name.charAt(0).toUpperCase() + name.slice(1));
      passwords.push(name + '@123');
      
      const nameParts = name.split(' ');
      if (nameParts.length > 1) {
        passwords.push(nameParts[0] + nameParts[1]);
        passwords.push(nameParts[0].charAt(0) + nameParts[1]);
      }
    }

    if (phone) {
      passwords.push(phone.slice(-6));
      passwords.push(phone.slice(-8));
      passwords.push(phone.slice(-4));
      if (name) {
        passwords.push(name + phone.slice(-4));
        passwords.push(name + phone.slice(-2));
      }
    }

    const words = info.match(/\b\w+\b/g) || [];
    words.forEach((word) => {
      if (word.length > 3) {
        passwords.push(word);
        passwords.push(word + '123');
        passwords.push(word.charAt(0).toUpperCase() + word.slice(1));
        if (phone) {
          passwords.push(word + phone.slice(-4));
        }
      }
    });

    years.forEach((year) => {
      if (name) passwords.push(name + year);
    });

    commonPatterns.forEach((pattern) => {
      if (name) passwords.push(name + pattern);
    });

    const dateMatches = info.match(/\d{2}[.-/]\d{2}[.-/]\d{2,4}/g);
    if (dateMatches) {
      dateMatches.forEach((date) => {
        const cleaned = date.replace(/\D/g, '');
        passwords.push(cleaned);
        if (name) passwords.push(name + cleaned);
      });
    }

    const uniquePasswords = [...new Set(passwords)].filter(p => p && p.length > 0);
    
    const shuffled = uniquePasswords.sort(() => Math.random() - 0.5);
    
    return shuffled.slice(0, 10);
  };

  const handleGeneratePasswords = () => {
    if (!ownerName && !ownerPhone && !additionalInfo) {
      toast.error('ОШИБКА', {
        description: 'Заполните хотя бы одно поле с информацией'
      });
      return;
    }

    setIsGenerating(true);
    toast.info('АНАЛИЗ ДАННЫХ', {
      description: 'Генерация вероятных паролей...'
    });

    setTimeout(() => {
      const passwords = generatePasswordVariants();
      setGeneratedPasswords(passwords);
      setIsGenerating(false);
      toast.success('ГЕНЕРАЦИЯ ЗАВЕРШЕНА', {
        description: `Создано ${passwords.length} вариантов`
      });
    }, 1500);
  };

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success('СКОПИРОВАНО', {
      description: password
    });
  };

  const handleBuyCode = () => {
    window.open('https://t.me/LyriumMine', '_blank');
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
              <h1 className="text-2xl font-bold text-primary matrix-glow">
                СИСТЕМА ЗАЩИТЫ
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
                  КУПИТЬ КОД
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="relative">
          <Button
            onClick={() => setShowMenu(!showMenu)}
            className="w-12 h-12 rounded-full bg-primary/90 hover:bg-primary shadow-[0_0_20px_rgba(0,255,65,0.6)] animate-pulse-glow"
          >
            <Icon name="Terminal" className="text-primary-foreground" size={24} />
          </Button>

          {showMenu && (
            <Card className="absolute top-14 right-0 w-48 p-2 bg-card/95 backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.3)]">
              <div className="space-y-1">
                <Button
                  onClick={() => {
                    setIsMinimized(false);
                    localStorage.setItem('codeHacker_minimized', 'false');
                  }}
                  variant="ghost"
                  className="w-full justify-start text-sm font-mono hover:bg-primary/10 hover:text-primary"
                >
                  <Icon name="Maximize2" className="mr-2" size={16} />
                  РАЗВЕРНУТЬ
                </Button>
                <Button
                  onClick={() => {
                    setGeneratedPasswords([]);
                    setShowMenu(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start text-sm font-mono hover:bg-destructive/10 hover:text-destructive"
                >
                  <Icon name="Trash2" className="mr-2" size={16} />
                  ОЧИСТИТЬ
                </Button>
                <Button
                  onClick={() => {
                    localStorage.removeItem('codeHacker_activated');
                    localStorage.removeItem('codeHacker_minimized');
                    setIsActivated(false);
                    setIsMinimized(false);
                    setShowMenu(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start text-sm font-mono hover:bg-destructive/10 hover:text-destructive"
                >
                  <Icon name="X" className="mr-2" size={16} />
                  ВЫХОД
                </Button>
              </div>
            </Card>
          )}
        </div>
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
                <h1 className="text-xl font-bold text-primary matrix-glow">
                  PASSWORD ANALYZER v3.0
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  ИНТЕЛЛЕКТУАЛЬНАЯ ГЕНЕРАЦИЯ ПАРОЛЕЙ
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setIsMinimized(true);
                localStorage.setItem('codeHacker_minimized', 'true');
              }}
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10"
            >
              <Icon name="Minimize2" className="text-primary" size={20} />
            </Button>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">
                ИМЯ ВЛАДЕЛЬЦА
              </label>
              <Input
                type="text"
                placeholder="Иван Петров"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary"
              />
            </div>

            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">
                НОМЕР ТЕЛЕФОНА
              </label>
              <Input
                type="text"
                placeholder="+7 999 123 45 67"
                value={ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
                className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary"
              />
            </div>

            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">
                ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ
              </label>
              <Textarea
                placeholder="Дата рождения, город, кличка питомца, любимая команда, важные даты..."
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary min-h-24 resize-none"
              />
            </div>

            <Button
              onClick={handleGeneratePasswords}
              disabled={isGenerating}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-mono shadow-[0_0_20px_rgba(0,255,65,0.5)]"
            >
              {isGenerating ? (
                <>
                  <Icon name="Loader2" className="mr-2 animate-spin" size={18} />
                  АНАЛИЗ...
                </>
              ) : (
                <>
                  <Icon name="Cpu" className="mr-2" size={18} />
                  СГЕНЕРИРОВАТЬ ПАРОЛИ
                </>
              )}
            </Button>
          </div>

          {generatedPasswords.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono text-primary matrix-glow">
                  ВЕРОЯТНЫЕ ПАРОЛИ ({generatedPasswords.length})
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
                    className="flex items-center justify-between bg-muted/30 rounded p-3 border border-primary/20 hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-secondary w-6">
                        #{index + 1}
                      </span>
                      <span className="font-mono text-primary text-base">
                        {password}
                      </span>
                    </div>
                    <Button
                      onClick={() => handleCopyPassword(password)}
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
                    >
                      <Icon name="Copy" className="text-primary" size={16} />
                    </Button>
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
              КУПИТЬ КОД АКТИВАЦИИ
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
