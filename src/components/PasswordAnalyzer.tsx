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
  onGenerate,
  onCopyPassword,
  onPinPassword,
  onLogout
}: PasswordAnalyzerProps) => {
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
                  Пользователь: <span className="text-primary">{currentUser?.username || 'Неизвестный'}</span>
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
              onClick={onGenerate}
              disabled={isGenerating}
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 font-mono shadow-[0_0_25px_rgba(0,255,65,0.5)] h-14 text-base disabled:opacity-50"
            >
              <Icon name={isGenerating ? "Loader2" : "Zap"} className={`mr-2 ${isGenerating ? 'animate-spin' : ''}`} size={20} />
              {isGenerating ? 'АНАЛИЗ В ПРОЦЕССЕ...' : 'ЗАПУСТИТЬ АНАЛИЗ'}
            </Button>

            {generatedPasswords.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                    <Icon name="Key" size={20} />
                    НАЙДЕННЫЕ ПАРОЛИ
                  </h2>
                  <span className="text-xs text-muted-foreground font-mono">
                    {generatedPasswords.length} результатов
                  </span>
                </div>
                
                <div className="grid gap-2">
                  {generatedPasswords.map((password, index) => (
                    <div
                      key={index}
                      className="bg-background/50 border border-primary/30 rounded-lg p-3 flex items-center justify-between hover:border-primary/60 transition-all group"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-xs font-mono text-muted-foreground w-6">
                          #{index + 1}
                        </span>
                        <code className="font-mono text-primary text-base flex-1">
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
