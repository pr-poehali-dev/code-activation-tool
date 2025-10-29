import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import MatrixRain from '@/components/MatrixRain';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <MatrixRain />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center mb-16 space-y-6">
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_40px_rgba(0,255,65,0.4)]">
              <Icon name="Brain" className="text-primary w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-primary matrix-glow tracking-wider">
            DUWDU144
          </h1>
          
          <p className="text-xl text-secondary font-mono max-w-2xl mx-auto">
            Профессиональная система восстановления доступа с использованием искусственного интеллекта Claude 3.5 Sonnet
          </p>

          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 font-mono shadow-[0_0_35px_rgba(0,255,65,0.6)] h-16 text-lg px-12 mt-8"
          >
            <Icon name="Zap" className="mr-3" size={24} />
            НАЧАТЬ АНАЛИЗ
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/40 hover:border-primary/60 transition-all hover:shadow-[0_0_25px_rgba(0,255,65,0.3)]">
            <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center mb-4">
              <Icon name="Sparkles" className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              Claude 3.5 Sonnet AI
            </h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Передовая нейросеть от Anthropic для глубокого психологического профилирования и предсказания паролей
            </p>
          </Card>

          <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/40 hover:border-primary/60 transition-all hover:shadow-[0_0_25px_rgba(0,255,65,0.3)]">
            <div className="w-12 h-12 rounded bg-secondary/20 flex items-center justify-center mb-4">
              <Icon name="Target" className="text-secondary w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              25 Уникальных Паролей
            </h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Генерация до 25 различных высоковероятных паролей с учётом психологического портрета цели
            </p>
          </Card>

          <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/40 hover:border-primary/60 transition-all hover:shadow-[0_0_25px_rgba(0,255,65,0.3)]">
            <div className="w-12 h-12 rounded bg-green-500/20 flex items-center justify-center mb-4">
              <Icon name="Gauge" className="text-green-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              Уровни Сложности
            </h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Выбор между лёгким, обычным и тяжёлым уровнем для точной настройки генерации паролей
            </p>
          </Card>

          <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/40 hover:border-primary/60 transition-all hover:shadow-[0_0_25px_rgba(0,255,65,0.3)]">
            <div className="w-12 h-12 rounded bg-purple-500/20 flex items-center justify-center mb-4">
              <Icon name="Users" className="text-purple-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              Психологическое Профилирование
            </h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              AI анализирует личность, привычки, эмоциональные привязки и культурный контекст человека
            </p>
          </Card>

          <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/40 hover:border-primary/60 transition-all hover:shadow-[0_0_25px_rgba(0,255,65,0.3)]">
            <div className="w-12 h-12 rounded bg-blue-500/20 flex items-center justify-center mb-4">
              <Icon name="Database" className="text-blue-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              Многоуровневый Алгоритм
            </h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Комбинация математических моделей и AI для максимальной эффективности подбора
            </p>
          </Card>

          <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/40 hover:border-primary/60 transition-all hover:shadow-[0_0_25px_rgba(0,255,65,0.3)]">
            <div className="w-12 h-12 rounded bg-red-500/20 flex items-center justify-center mb-4">
              <Icon name="Shield" className="text-red-400 w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              Закрытая Система
            </h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Доступ только по активационным кодам. Полная конфиденциальность и защита данных
            </p>
          </Card>
        </div>

        <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.4)]">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <Icon name="Cpu" size={28} />
            Как Работает Система
          </h2>
          
          <div className="space-y-4 text-muted-foreground font-mono">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h4 className="text-primary font-bold mb-1">Сбор Информации</h4>
                <p className="text-sm leading-relaxed">
                  Вы вводите известные данные о цели: имя, телефон, хобби, важные даты, известные пароли и другую информацию
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h4 className="text-primary font-bold mb-1">Глубокий AI Анализ</h4>
                <p className="text-sm leading-relaxed">
                  Claude 3.5 Sonnet проводит психологическое профилирование: анализирует паттерны поведения, эмоциональные привязки, культурный контекст и когнитивные упрощения
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h4 className="text-primary font-bold mb-1">Выбор Стратегии</h4>
                <p className="text-sm leading-relaxed">
                  Система адаптирует генерацию под выбранный уровень сложности: лёгкие пароли (qwerty, 12345), обычные (комбинации слов) или тяжёлые (многоуровневые с заменами)
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <span className="text-secondary font-bold">4</span>
              </div>
              <div>
                <h4 className="text-secondary font-bold mb-1">Генерация и Ранжирование</h4>
                <p className="text-sm leading-relaxed">
                  AI создаёт 25 уникальных паролей, ранжируя их по вероятности использования на основе психологического портрета цели
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-center mt-16 space-y-4">
          <p className="text-sm text-muted-foreground font-mono max-w-2xl mx-auto">
            ВНИМАНИЕ: Система предназначена только для законного восстановления доступа к собственным аккаунтам. 
            Использование для несанкционированного доступа преследуется по закону.
          </p>
          
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 font-mono shadow-[0_0_35px_rgba(0,255,65,0.6)] h-14 text-base px-10"
          >
            <Icon name="ArrowRight" className="mr-2" size={20} />
            ВОЙТИ В СИСТЕМУ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
