import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
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
  const [isRunning, setIsRunning] = useState(false);
  const [currentCode, setCurrentCode] = useState('000000');
  const [targetCode, setTargetCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const savedActivation = localStorage.getItem('codeHacker_activated');
    if (savedActivation === 'true') {
      setIsActivated(true);
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

  const generateRandomCode = () => {
    return Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
  };

  useEffect(() => {
    if (!isRunning || !targetCode) return;

    const interval = setInterval(() => {
      setAttempts((prev) => prev + 1);
      const newCode = generateRandomCode();
      setCurrentCode(newCode);

      if (newCode === targetCode) {
        setIsRunning(false);
        toast.success('КОД ВЗЛОМАН!', {
          description: `Найдено совпадение: ${newCode}`,
          duration: 5000
        });
      }
    }, 10);

    return () => clearInterval(interval);
  }, [isRunning, targetCode]);

  const handleStartCracking = () => {
    if (!targetCode || targetCode.length !== 6) {
      toast.error('ОШИБКА', {
        description: 'Введите 6-значный код'
      });
      return;
    }
    setIsRunning(true);
    setAttempts(0);
    toast.info('ЗАПУСК СИСТЕМЫ ПОДБОРА', {
      description: 'Начало перебора кодов'
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
                  onClick={() => setIsMinimized(false)}
                  variant="ghost"
                  className="w-full justify-start text-sm font-mono hover:bg-primary/10 hover:text-primary"
                >
                  <Icon name="Maximize2" className="mr-2" size={16} />
                  РАЗВЕРНУТЬ
                </Button>
                <Button
                  onClick={() => {
                    setIsRunning(false);
                    setShowMenu(false);
                  }}
                  variant="ghost"
                  className="w-full justify-start text-sm font-mono hover:bg-destructive/10 hover:text-destructive"
                >
                  <Icon name="Square" className="mr-2" size={16} />
                  ОСТАНОВИТЬ
                </Button>
                <Button
                  onClick={() => {
                    localStorage.removeItem('codeHacker_activated');
                    setIsActivated(false);
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

      <Card className="w-full max-w-2xl p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.3)] relative z-10">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                <Icon name="Terminal" className="text-primary w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary matrix-glow">
                  CODE CRACKER v2.0
                </h1>
                <p className="text-xs text-muted-foreground font-mono">
                  СИСТЕМА ПОДБОРА КОДОВ
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsMinimized(true)}
              variant="ghost"
              size="icon"
              className="hover:bg-primary/10"
            >
              <Icon name="Minimize2" className="text-primary" size={20} />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-mono text-muted-foreground mb-2 block">
                ЦЕЛЕВОЙ КОД (6 ЦИФР)
              </label>
              <Input
                type="text"
                placeholder="123456"
                value={targetCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setTargetCode(value);
                }}
                disabled={isRunning}
                className="text-center font-mono text-2xl tracking-widest bg-input/50 border-primary/30 focus:border-primary text-primary"
                maxLength={6}
              />
            </div>

            <div className="bg-muted/30 rounded-lg p-6 border border-primary/20">
              <div className="text-center space-y-2">
                <p className="text-xs font-mono text-muted-foreground">
                  ТЕКУЩИЙ ПЕРЕБОР
                </p>
                <div className="text-5xl font-bold font-mono text-primary matrix-glow tracking-wider">
                  {currentCode}
                </div>
                <div className="flex justify-center gap-8 pt-3">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground font-mono">ПОПЫТОК</p>
                    <p className="text-xl font-bold text-secondary font-mono">
                      {attempts.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground font-mono">СТАТУС</p>
                    <p className={`text-xl font-bold font-mono ${isRunning ? 'text-primary animate-pulse-glow' : 'text-muted-foreground'}`}>
                      {isRunning ? 'РАБОТА' : 'ОЖИДАНИЕ'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleStartCracking}
                disabled={isRunning || !targetCode}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/80 font-mono shadow-[0_0_20px_rgba(0,255,65,0.5)]"
              >
                <Icon name="Play" className="mr-2" size={18} />
                ЗАПУСТИТЬ
              </Button>
              <Button
                onClick={() => {
                  setIsRunning(false);
                  setAttempts(0);
                  setCurrentCode('000000');
                }}
                disabled={!isRunning}
                variant="outline"
                className="flex-1 border-destructive text-destructive hover:bg-destructive/10 font-mono"
              >
                <Icon name="Square" className="mr-2" size={18} />
                ОСТАНОВИТЬ
              </Button>
            </div>

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
        </div>
      </Card>
    </div>
  );
};

export default Index;
