import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import MatrixRain from '@/components/MatrixRain';

interface CodeActivationScreenProps {
  activationCode: string;
  setActivationCode: (value: string) => void;
  onCheckCode: () => void;
  onSwitchToLogin: () => void;
  onBuyCode: () => void;
}

const CodeActivationScreen = ({
  activationCode,
  setActivationCode,
  onCheckCode,
  onSwitchToLogin,
  onBuyCode
}: CodeActivationScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <MatrixRain />
      <Card className="w-full max-w-md p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.3)] relative z-10">
        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/30 to-primary/20 flex items-center justify-center shadow-[0_0_25px_rgba(255,183,3,0.4)]">
                <Icon name="Key" className="text-secondary w-10 h-10" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary matrix-glow tracking-wider">
              АКТИВАЦИЯ КОДА
            </h1>
            <p className="text-muted-foreground text-sm font-mono">
              Введите код для создания аккаунта
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                КОД АКТИВАЦИИ
              </label>
              <Input
                type="text"
                placeholder="ВВЕДИТЕ КОД"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && onCheckCode()}
                className="text-center font-mono text-lg tracking-widest bg-input/50 border-secondary/30 focus:border-secondary text-secondary placeholder:text-muted-foreground"
                maxLength={15}
              />
            </div>

            <Button
              onClick={onCheckCode}
              className="w-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/70 font-mono shadow-[0_0_20px_rgba(255,183,3,0.5)] h-12"
            >
              <Icon name="Check" className="mr-2" size={20} />
              ПРОВЕРИТЬ КОД
            </Button>

            <div className="pt-4 border-t border-border/50 space-y-3">
              <Button
                onClick={onSwitchToLogin}
                variant="ghost"
                className="w-full font-mono text-muted-foreground hover:text-primary"
              >
                <Icon name="ArrowLeft" className="mr-2" size={18} />
                Вернуться к входу
              </Button>
              
              <p className="text-xs text-center text-muted-foreground font-mono">
                Нет кода? Купите за 199₽
              </p>
              <Button
                onClick={onBuyCode}
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
};

export default CodeActivationScreen;
