import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import MatrixRain from '@/components/MatrixRain';

interface RegisterScreenProps {
  activationCode: string;
  username: string;
  password: string;
  passwordConfirm: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
  onRegister: () => void;
}

const RegisterScreen = ({
  activationCode,
  username,
  password,
  passwordConfirm,
  setUsername,
  setPassword,
  setPasswordConfirm,
  onRegister
}: RegisterScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <MatrixRain />
      <Card className="w-full max-w-md p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.3)] relative z-10">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center shadow-[0_0_25px_rgba(0,255,65,0.4)]">
                <Icon name="UserPlus" className="text-primary w-10 h-10 matrix-glow" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary matrix-glow tracking-wider">
              СОЗДАНИЕ АККАУНТА
            </h1>
            <p className="text-muted-foreground text-sm font-mono">
              Код <span className="text-secondary font-bold">{activationCode}</span> действителен
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                НИК (минимум 3 символа)
              </label>
              <Input
                type="text"
                placeholder="Придумайте ник"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                ПАРОЛЬ (минимум 6 символов)
              </label>
              <Input
                type="password"
                placeholder="Придумайте пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary placeholder:text-muted-foreground"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                ПОВТОР ПАРОЛЯ
              </label>
              <Input
                type="password"
                placeholder="Повторите пароль"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && onRegister()}
                className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary placeholder:text-muted-foreground"
              />
            </div>

            <div className="bg-secondary/5 border border-secondary/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Icon name="Info" className="text-secondary flex-shrink-0 mt-0.5" size={16} />
                <p className="text-xs text-muted-foreground font-mono">
                  Запомните эти данные — они понадобятся для входа в систему
                </p>
              </div>
            </div>

            <Button
              onClick={onRegister}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/80 font-mono shadow-[0_0_20px_rgba(0,255,65,0.5)] h-12"
            >
              <Icon name="Check" className="mr-2" size={20} />
              СОЗДАТЬ АККАУНТ
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterScreen;
