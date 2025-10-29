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
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-pulse">
              🚀 САМЫЙ МОЩНЫЙ СЕРВИС ДЛЯ ПОДБОРА ПАРОЛЕЙ В МИРЕ
            </p>
            <p className="text-xl text-secondary font-mono">
              🧠 Нейросеть DUWDU1 — в 32 раза мощнее Claude 3.5 Sonnet
            </p>
            <p className="text-lg text-primary/80 font-mono">
              🌐 Глубочайший анализ социальных сетей + НЕОГРАНИЧЕННОЕ количество паролей
            </p>
            <p className="text-md text-destructive font-bold tracking-wide">
              ⚠️ ПРОРЫВНАЯ ТЕХНОЛОГИЯ | 99.7% УСПЕХА | ПЕРЕВОРОТ В ИНДУСТРИИ
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 mt-8">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-primary via-secondary to-primary text-primary-foreground hover:scale-110 transition-transform font-mono shadow-[0_0_50px_rgba(0,255,65,0.8)] h-20 text-2xl px-16 pulse-glow animate-pulse"
            >
              <Icon name="Rocket" className="mr-3" size={32} />
              🚀 ЗАПУСТИТЬ DUWDU1
            </Button>
            <p className="text-destructive font-bold text-sm animate-pulse">
              ⚡ БЕСПЛАТНЫЙ ДОСТУП | БЕЗ ОГРАНИЧЕНИЙ | БЕСКОНЕЧНАЯ МОЩЬ
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/40 hover:border-primary/60 transition-all hover:shadow-[0_0_25px_rgba(0,255,65,0.3)]">
            <div className="w-12 h-12 rounded bg-primary/20 flex items-center justify-center mb-4">
              <Icon name="Sparkles" className="text-primary w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              🧠 DUWDU1 НЕЙРОСЕТЬ
            </h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Революционная AI-система, в 32 раза мощнее любых аналогов. Глубочайшее психологическое профилирование
            </p>
          </Card>

          <Card className="p-6 bg-card/90 backdrop-blur-sm border-2 border-primary/40 hover:border-primary/60 transition-all hover:shadow-[0_0_25px_rgba(0,255,65,0.3)]">
            <div className="w-12 h-12 rounded bg-secondary/20 flex items-center justify-center mb-4">
              <Icon name="Target" className="text-secondary w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">
              ♾️ НЕОГРАНИЧЕННЫЕ ПАРОЛИ
            </h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              Генерация 50+ уникальных паролей без ограничений по времени. Максимальная вероятность успеха 99.7%
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
              🌐 Анализ Соцсетей
            </h3>
            <p className="text-sm text-muted-foreground font-mono leading-relaxed">
              DUWDU1 сканирует ВК, Instagram, Facebook, анализирует посты, фото, друзей, интересы для создания полного психологического портрета
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
                <h4 className="text-primary font-bold mb-1">🧠 Революционный DUWDU1 Анализ</h4>
                <p className="text-sm leading-relaxed">
                  DUWDU1 сканирует социальные сети, анализирует посты, фото, комментарии, проводит глубочайшее психологическое профилирование с анализом эмоций, травм, мечт, страхов
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
                <h4 className="text-secondary font-bold mb-1">♾️ Неограниченная Генерация</h4>
                <p className="text-sm leading-relaxed">
                  DUWDU1 генерирует 50+ паролей без ограничений по времени, ранжируя от самых вероятных к менее вероятным на основе глубокого психологического анализа. Успех 99.7%
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