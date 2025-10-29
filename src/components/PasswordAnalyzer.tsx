import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import MatrixRain from '@/components/MatrixRain';

interface PasswordAnalyzerProps {
  currentUser: { id: number; username: string } | null;
  ownerName: string;
  ownerPhone: string;
  platform: string;
  knownPasswords: string;
  additionalInfo: string;
  pinnedPassword: string;
  difficulty: 'easy' | 'normal' | 'hard';
  generatedPasswords: string[];
  isGenerating: boolean;
  analysisProgress: number;
  currentAnalysisStep: string;
  setOwnerName: (value: string) => void;
  setOwnerPhone: (value: string) => void;
  setPlatform: (value: string) => void;
  setKnownPasswords: (value: string) => void;
  setAdditionalInfo: (value: string) => void;
  setPinnedPassword: (value: string) => void;
  setDifficulty: (value: 'easy' | 'normal' | 'hard') => void;
  onGenerate: () => void;
  onCopyPassword: (password: string) => void;
  onPinPassword: (password: string) => void;
  onLogout: () => void;
}

const PasswordAnalyzer = ({
  currentUser,
  ownerName,
  ownerPhone,
  platform,
  knownPasswords,
  additionalInfo,
  pinnedPassword,
  difficulty,
  generatedPasswords,
  isGenerating,
  analysisProgress,
  currentAnalysisStep,
  setOwnerName,
  setOwnerPhone,
  setPlatform,
  setKnownPasswords,
  setAdditionalInfo,
  setPinnedPassword,
  setDifficulty,
  onGenerate,
  onCopyPassword,
  onPinPassword,
  onLogout
}: PasswordAnalyzerProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <MatrixRain />

      <Card className="w-full max-w-3xl p-8 bg-card/90 backdrop-blur-sm border-2 border-primary/50 shadow-[0_0_30px_rgba(0,255,65,0.3)] relative z-10 max-h-[85vh] overflow-y-auto fade-in">
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center pulse-glow">
                <Icon name="Brain" className="text-primary w-5 h-5" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary matrix-glow tracking-wider">
                  DUWDU144
                </h1>
                <p className="text-xs text-secondary font-mono">
                  👤 <span className="text-primary">{currentUser?.username || 'Неизвестный'}</span> • 🧠 Powered by DUWDU1 Neural Network
                </p>
              </div>
            </div>
            <Button
              onClick={onLogout}
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/10"
              title="Выйти из системы"
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

            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded border border-primary/30 mb-4">
              <p className="text-xs font-mono text-primary mb-2">
                🧠 DUWDU1 проанализирует введённые данные и соцсети для создания психологического профиля
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono text-muted-foreground mb-2 block flex items-center gap-2">
                  <Icon name="User" size={14} />
                  ИМЯ ВЛАДЕЛЬЦА
                </label>
                <Input
                  type="text"
                  placeholder="Иван Петров"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="font-mono bg-input/50 border-primary/30 focus:border-primary text-primary text-sm hover:border-primary/50 transition-colors"
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

            <div>
              <label className="text-xs font-mono text-muted-foreground mb-2 block">
                УРОВЕНЬ СЛОЖНОСТИ ПАРОЛЯ
              </label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  type="button"
                  onClick={() => setDifficulty('easy')}
                  variant={difficulty === 'easy' ? 'default' : 'outline'}
                  className={`font-mono text-sm transition-all ${
                    difficulty === 'easy'
                      ? 'bg-green-500/20 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                      : 'border-primary/30 text-muted-foreground hover:border-green-500/50 hover:text-green-400'
                  }`}
                >
                  <Icon name="Smile" size={16} className="mr-2" />
                  ЛЁГКИЙ
                </Button>
                <Button
                  type="button"
                  onClick={() => setDifficulty('normal')}
                  variant={difficulty === 'normal' ? 'default' : 'outline'}
                  className={`font-mono text-sm transition-all ${
                    difficulty === 'normal'
                      ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,255,65,0.4)]'
                      : 'border-primary/30 text-muted-foreground hover:border-primary/50 hover:text-primary'
                  }`}
                >
                  <Icon name="Meh" size={16} className="mr-2" />
                  ОБЫЧНЫЙ
                </Button>
                <Button
                  type="button"
                  onClick={() => setDifficulty('hard')}
                  variant={difficulty === 'hard' ? 'default' : 'outline'}
                  className={`font-mono text-sm transition-all ${
                    difficulty === 'hard'
                      ? 'bg-red-500/20 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                      : 'border-primary/30 text-muted-foreground hover:border-red-500/50 hover:text-red-400'
                  }`}
                >
                  <Icon name="Frown" size={16} className="mr-2" />
                  ТЯЖЁЛЫЙ
                </Button>
              </div>
              <div className="mt-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded border border-primary/20">
                <p className="text-xs text-primary font-mono font-bold mb-1">
                  {difficulty === 'easy' && '🟢 РЕЖИМ: Простые пароли'}
                  {difficulty === 'normal' && '🟡 РЕЖИМ: Средние пароли'}
                  {difficulty === 'hard' && '🔴 РЕЖИМ: Сложные пароли'}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {difficulty === 'easy' && '4-8 символов: qwerty, 12345, имя+год, клавиатурные последовательности'}
                  {difficulty === 'normal' && '8-12 символов: комбинации слов, дат, имён близких + модификации'}
                  {difficulty === 'hard' && '12-20 символов: паттерны с заменами (a→@, e→3), криптостойкие комбинации'}
                </p>
              </div>
            </div>

            {isGenerating && (
              <div className="space-y-3 p-6 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 border-2 border-primary/40 rounded-lg shadow-[0_0_25px_rgba(0,255,65,0.3)] pulse-glow">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-primary font-bold animate-pulse">🧠 {currentAnalysisStep}</span>
                  <span className="text-xs font-mono text-secondary font-bold">{Math.round(analysisProgress)}%</span>
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
              onClick={onGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 font-mono shadow-[0_0_25px_rgba(0,255,65,0.5)] h-14 text-base disabled:opacity-50"
            >
              <Icon name={isGenerating ? "Loader2" : "Zap"} className={`mr-2 ${isGenerating ? 'animate-spin' : ''}`} size={20} />
              {isGenerating ? 'АНАЛИЗ В ПРОЦЕССЕ...' : 'ЗАПУСТИТЬ АНАЛИЗ'}
            </Button>

            {generatedPasswords.length > 0 && (
              <div className="space-y-3 fade-in">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/40">
                  <h2 className="text-xl font-bold text-primary flex items-center gap-3 matrix-glow">
                    <Icon name="Key" size={24} />
                    🔓 DUWDU1 РЕЗУЛЬТАТЫ
                  </h2>
                  <span className="text-sm text-secondary font-mono font-bold bg-primary/20 px-3 py-1 rounded">
                    {generatedPasswords.length} паролей
                  </span>
                </div>
                
                <div className="grid gap-2">
                  {generatedPasswords.map((password, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-background/80 to-background/60 border-2 border-primary/40 rounded-lg p-4 flex items-center justify-between hover:border-secondary hover:shadow-[0_0_20px_rgba(0,255,65,0.3)] transition-all group hover:scale-[1.02]"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-sm font-mono font-bold text-secondary w-8 bg-primary/20 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                        <code className="font-mono text-primary text-lg flex-1 font-bold tracking-wide">
                          {password}
                        </code>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => onPinPassword(password)}
                          variant="ghost"
                          size="sm"
                          className={`${pinnedPassword === password ? 'text-secondary' : 'text-muted-foreground'} hover:text-secondary`}
                          title={pinnedPassword === password ? "Открепить" : "Закрепить"}
                        >
                          <Icon name="Pin" size={16} />
                        </Button>
                        <Button
                          onClick={() => onCopyPassword(password)}
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-secondary"
                        >
                          <Icon name="Copy" size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PasswordAnalyzer;