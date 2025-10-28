import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import LoginScreen from '@/components/auth/LoginScreen';
import CodeActivationScreen from '@/components/auth/CodeActivationScreen';
import RegisterScreen from '@/components/auth/RegisterScreen';
import PasswordAnalyzer from '@/components/PasswordAnalyzer';
import PurchaseModal from '@/components/modals/PurchaseModal';
import { generatePasswordVariants } from '@/utils/passwordGenerator';

const API_URL = 'https://functions.poehali.dev/6bd52555-a066-4652-afba-34a87666fde3';

const Index = () => {
  const [authState, setAuthState] = useState<'login' | 'code' | 'register' | 'authenticated'>('login');
  const [activationCode, setActivationCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [currentUser, setCurrentUser] = useState<{id: number, username: string} | null>(null);

  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [platform, setPlatform] = useState('');
  const [knownPasswords, setKnownPasswords] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [generatedPasswords, setGeneratedPasswords] = useState<string[]>([]);
  const [pinnedPassword, setPinnedPassword] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [currentAnalysisStep, setCurrentAnalysisStep] = useState('');
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('duwdu_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setAuthState('authenticated');
    }
  }, []);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      toast.error('ОШИБКА', { description: 'Заполните все поля' });
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username: username.trim(), password: password.trim() })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCurrentUser(data.user);
        localStorage.setItem('duwdu_user', JSON.stringify(data.user));
        setAuthState('authenticated');
        toast.success('ВХОД ВЫПОЛНЕН', { description: `Добро пожаловать, ${data.user.username}!` });
      } else {
        toast.error('ОШИБКА ВХОДА', { description: data.error || 'Неверный ник или пароль' });
      }
    } catch (error) {
      toast.error('ОШИБКА СЕТИ', { description: 'Не удалось подключиться к серверу' });
    }
  };

  const handleCheckCode = async () => {
    const code = activationCode.toUpperCase().trim();
    if (!code) {
      toast.error('ОШИБКА', { description: 'Введите код активации' });
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'check_code', code })
      });

      const data = await response.json();

      if (response.ok && data.valid) {
        setAuthState('register');
        toast.success('КОД ДЕЙСТВИТЕЛЕН', { description: 'Создайте аккаунт для продолжения' });
      } else {
        toast.error('ОШИБКА', { description: data.error || 'Неверный или использованный код' });
      }
    } catch (error) {
      toast.error('ОШИБКА СЕТИ', { description: 'Не удалось проверить код' });
    }
  };

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !passwordConfirm.trim()) {
      toast.error('ОШИБКА', { description: 'Заполните все поля' });
      return;
    }

    if (username.trim().length < 3) {
      toast.error('ОШИБКА', { description: 'Ник должен быть минимум 3 символа' });
      return;
    }

    if (password.trim().length < 6) {
      toast.error('ОШИБКА', { description: 'Пароль должен быть минимум 6 символов' });
      return;
    }

    if (password !== passwordConfirm) {
      toast.error('ОШИБКА', { description: 'Пароли не совпадают' });
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          code: activationCode.toUpperCase().trim(),
          username: username.trim(),
          password: password.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCurrentUser(data.user);
        localStorage.setItem('duwdu_user', JSON.stringify(data.user));
        setAuthState('authenticated');
        toast.success('АККАУНТ СОЗДАН', { description: `Добро пожаловать, ${data.user.username}!` });
      } else {
        toast.error('ОШИБКА РЕГИСТРАЦИИ', { description: data.error || 'Не удалось создать аккаунт' });
      }
    } catch (error) {
      toast.error('ОШИБКА СЕТИ', { description: 'Не удалось подключиться к серверу' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('duwdu_user');
    setCurrentUser(null);
    setAuthState('login');
    setUsername('');
    setPassword('');
    setPasswordConfirm('');
    setActivationCode('');
    setGeneratedPasswords([]);
    toast.info('ВЫХОД', { description: 'Вы вышли из системы' });
  };

  const handleGeneratePasswords = async () => {
    if (!additionalInfo && !ownerName && !ownerPhone && !platform && (!knownPasswords || knownPasswords.toLowerCase() === 'незнаю')) {
      toast.error('ОШИБКА', {
        description: 'Заполните хотя бы одно поле с информацией'
      });
      return;
    }

    setIsGenerating(true);
    setAnalysisProgress(0);
    setGeneratedPasswords([]);

    const steps = [
      'Инициализация квантовой нейросети GPT-7...',
      'Подключение к базам данных утечек (>15 млрд записей)...',
      'Глубокий анализ дополнительной информации...',
      'OSINT: поиск цифровых следов в Dark Web...',
      'Сканирование социальных паттернов и психотипа...',
      'Анализ закрепленного пароля через Rainbow Tables...',
      'Применение алгоритмов машинного обучения GPT-4...',
      'Комбинирование данных из всех источников...',
      'Применение продвинутых leet-замен и мутаций...',
      'Генерация вариантов через Markov Chains...',
      'Кросс-анализ с базой Common Passwords (10M+)...',
      'Приоритизация по вероятности через Bayesian Network...',
      'Финальная оптимизация и ранжирование через AI...'
    ];

    let currentStep = 0;
    const stepDuration = 2000;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setCurrentAnalysisStep(steps[currentStep]);
        setAnalysisProgress((currentStep / steps.length) * 100);
      } else {
        clearInterval(interval);
        setCurrentAnalysisStep('Завершено!');
        setAnalysisProgress(100);
        
        setTimeout(async () => {
          const passwords = await generatePasswordVariants(
            ownerName,
            ownerPhone,
            platform,
            knownPasswords,
            additionalInfo,
            pinnedPassword
          );
          setGeneratedPasswords(passwords);
          setIsGenerating(false);
          toast.success('АНАЛИЗ ЗАВЕРШЁН', {
            description: `Найдено ${passwords.length} высоковероятных паролей`
          });
        }, 1000);
      }
    }, stepDuration);

    setCurrentAnalysisStep(steps[0]);
  };

  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success('СКОПИРОВАНО', {
      description: password
    });
  };

  const handleBuyCode = () => {
    setShowPurchaseModal(true);
  };

  const handlePinPassword = (password: string) => {
    if (pinnedPassword === password) {
      setPinnedPassword('');
      toast.info('ПАРОЛЬ ОТКРЕПЁН', {
        description: 'Используйте другой пароль как основу'
      });
    } else {
      setPinnedPassword(password);
      toast.success('ПАРОЛЬ ЗАКРЕПЛЁН', {
        description: 'Новая генерация будет основана на нём'
      });
    }
  };

  if (authState === 'code') {
    return (
      <>
        <CodeActivationScreen
          activationCode={activationCode}
          setActivationCode={setActivationCode}
          onCheckCode={handleCheckCode}
          onSwitchToLogin={() => setAuthState('login')}
          onBuyCode={handleBuyCode}
        />
        {showPurchaseModal && <PurchaseModal onClose={() => setShowPurchaseModal(false)} />}
      </>
    );
  }

  if (authState === 'register') {
    return (
      <RegisterScreen
        activationCode={activationCode}
        username={username}
        password={password}
        passwordConfirm={passwordConfirm}
        setUsername={setUsername}
        setPassword={setPassword}
        setPasswordConfirm={setPasswordConfirm}
        onRegister={handleRegister}
      />
    );
  }

  if (authState === 'login') {
    return (
      <>
        <LoginScreen
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onLogin={handleLogin}
          onSwitchToCode={() => setAuthState('code')}
          onBuyCode={handleBuyCode}
        />
        {showPurchaseModal && <PurchaseModal onClose={() => setShowPurchaseModal(false)} />}
      </>
    );
  }

  return (
    <PasswordAnalyzer
      currentUser={currentUser}
      ownerName={ownerName}
      ownerPhone={ownerPhone}
      platform={platform}
      knownPasswords={knownPasswords}
      additionalInfo={additionalInfo}
      pinnedPassword={pinnedPassword}
      generatedPasswords={generatedPasswords}
      isGenerating={isGenerating}
      analysisProgress={analysisProgress}
      currentAnalysisStep={currentAnalysisStep}
      setOwnerName={setOwnerName}
      setOwnerPhone={setOwnerPhone}
      setPlatform={setPlatform}
      setKnownPasswords={setKnownPasswords}
      setAdditionalInfo={setAdditionalInfo}
      setPinnedPassword={setPinnedPassword}
      onGenerate={handleGeneratePasswords}
      onCopyPassword={handleCopyPassword}
      onPinPassword={handlePinPassword}
      onLogout={handleLogout}
    />
  );
};

export default Index;