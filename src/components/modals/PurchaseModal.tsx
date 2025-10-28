import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface PurchaseModalProps {
  onClose: () => void;
}

const PurchaseModal = ({ onClose }: PurchaseModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={onClose}>
      <Card 
        className="w-full max-w-lg p-6 bg-card/95 backdrop-blur border-2 border-secondary/50 shadow-[0_0_40px_rgba(255,183,3,0.5)] relative my-8 animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 hover:bg-destructive/10 z-10"
        >
          <Icon name="X" className="text-muted-foreground" size={20} />
        </Button>

        <div className="space-y-6">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary/30 to-primary/20 flex items-center justify-center shadow-[0_0_30px_rgba(255,183,3,0.4)]">
                <Icon name="ShoppingCart" className="text-secondary w-10 h-10" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-primary matrix-glow">
              ПОКУПКА КОДА
            </h2>
            <p className="text-5xl font-bold text-secondary mt-3 matrix-glow">199₽</p>
            <p className="text-sm text-muted-foreground font-mono">Единоразовая оплата • Без подписок</p>
          </div>

          <div className="bg-primary/5 border-2 border-primary/40 rounded-lg p-5 space-y-4">
            <h3 className="text-base font-bold text-primary flex items-center gap-2">
              <Icon name="Clipboard" size={18} />
              ИНСТРУКЦИЯ ПО ПОКУПКЕ:
            </h3>
            
            <ol className="text-sm text-foreground space-y-3 font-mono list-none">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">1</span>
                <span>Нажмите кнопку ниже для перехода в Telegram</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">2</span>
                <span>Напишите: <span className="text-secondary font-bold">"Хочу купить код DUWDU144"</span></span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">3</span>
                <span>Переведите 199₽ на указанные реквизиты</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">4</span>
                <span>Отправьте скриншот оплаты в чат</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">5</span>
                <span>Получите код активации <span className="text-secondary font-bold">в течение 5 минут</span></span>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-secondary/10 to-primary/5 border-2 border-secondary/40 rounded-lg p-4">
            <div className="flex items-start gap-3 text-sm">
              <Icon name="CheckCircle2" className="text-secondary flex-shrink-0 mt-0.5" size={20} />
              <div className="space-y-2">
                <p className="text-secondary font-bold text-base">ЧТО ВЫ ПОЛУЧИТЕ:</p>
                <ul className="text-muted-foreground space-y-2 font-mono">
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Уникальный код активации</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Неограниченный доступ к AI-системе</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Подбор паролей по 10+ алгоритмам</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Поддержка 24/7 в Telegram</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Button
            onClick={() => window.open('https://t.me/LyriumMine', '_blank')}
            className="w-full bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-secondary/70 font-mono shadow-[0_0_25px_rgba(255,183,3,0.6)] h-14 text-lg"
          >
            <Icon name="Send" className="mr-2" size={22} />
            ОТКРЫТЬ TELEGRAM ЧАТ
          </Button>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground font-mono">
              Поддержка: <span className="text-secondary">@LyriumMine</span>
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
              <span className="text-xs text-secondary font-mono">Отвечаем в течение 5 минут</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PurchaseModal;
