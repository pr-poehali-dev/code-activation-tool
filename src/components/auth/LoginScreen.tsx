import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import MatrixRain from '@/components/MatrixRain';

interface LoginScreenProps {
  username: string;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  onLogin: () => void;
  onSwitchToCode: () => void;
  onBuyCode: () => void;
}

const LoginScreen = ({
  username,
  password,
  setUsername,
  setPassword,
  onLogin,
  onSwitchToCode,
  onBuyCode
}: LoginScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <MatrixRain />
      <Card className="w-full max-w-md p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.3)] relative z-10">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,65,0.4)]">
                <Icon name="Shield" className="text-primary w-10 h-10 matrix-glow" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary matrix-glow tracking-wider">
              DUWDU144
            </h1>
            <p className="text-muted-foreground text-sm font-mono">
              AI-система подбора паролей нового поколения
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="text-xs text-secondary font-mono">ОНЛАЙН</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                НИК
              </label>
              <Input
                type="text"
                placeholder="Введите ваш ник"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                ПАРОЛЬ
              </label>
              <Input
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onLogin()}
                className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary placeholder:text-muted-foreground"
              />
            </div>

            <Button
              onClick={onLogin}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-mono shadow-[0_0_20px_rgba(0,255,65,0.5)] h-12"
            >
              <Icon name="LogIn" className="mr-2" size={20} />
              ВОЙТИ В СИСТЕМУ
            </Button>

            <div className="pt-4 border-t border-border/50 space-y-3">
              <p className="text-xs text-center text-muted-foreground font-mono">
                Нет аккаунта? Купите код активации
              </p>
              <Button
                onClick={onSwitchToCode}
                variant="outline"
                className="w-full border-secondary text-secondary hover:bg-secondary/10 font-mono h-11"
              >
                <Icon name="Key" className="mr-2" size={18} />
                У МЕНЯ ЕСТЬ КОД
              </Button>
              <Button
                onClick={onBuyCode}
                className="w-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/70 font-mono shadow-[0_0_15px_rgba(255,183,3,0.4)] h-12 text-base"
              >
                <Icon name="ShoppingCart" className="mr-2" size={20} />
                КУПИТЬ КОД — 199₽
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginScreen;
