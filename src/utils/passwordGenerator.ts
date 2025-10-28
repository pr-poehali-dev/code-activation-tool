export const generatePasswordVariants = async (
  ownerName: string,
  ownerPhone: string,
  platform: string,
  knownPasswords: string,
  additionalInfo: string,
  pinnedPassword: string
): Promise<string[]> => {
  const passwords: string[] = [];
  const name = ownerName.toLowerCase().trim();
  const phone = ownerPhone.replace(/\D/g, '');
  const info = additionalInfo.toLowerCase();
  const platformLower = platform.toLowerCase().trim();
  const known = knownPasswords.toLowerCase().trim();

  if (pinnedPassword) {
    passwords.push(pinnedPassword);
  }

  const platformPatterns: Record<string, string[]> = {
    'вконтакте': ['vk', 'vkontakte', 'вк', 'vkcom', 'vk.com'],
    'вк': ['vk', 'vkontakte', 'вк', 'vkcom'],
    'instagram': ['insta', 'ig', 'inst', 'instagram', 'gram'],
    'telegram': ['tg', 'tlg', 'telegram', 'tele', 'telega'],
    'whatsapp': ['wa', 'whatsapp', 'whats', 'wapp'],
    'gmail': ['google', 'gmail', 'mail', 'gm', 'goog'],
    'yandex': ['yandex', 'ya', 'яндекс', 'yandexru'],
    'mail.ru': ['mail', 'mailru', 'мейл'],
    'facebook': ['fb', 'facebook', 'face'],
    'twitter': ['tw', 'twitter', 'twit', 'x'],
    'tiktok': ['tiktok', 'tt', 'tik'],
    'discord': ['discord', 'ds', 'disc'],
    'youtube': ['youtube', 'yt', 'you'],
    'twitch': ['twitch', 'tv'],
    'steam': ['steam', 'stm'],
    'playstation': ['ps', 'playstation', 'psn'],
    'xbox': ['xbox', 'xb'],
    'apple': ['apple', 'icloud', 'appl']
  };

  const commonSymbols = ['!', '@', '#', '$', '*', '_', '.', '-', '&'];
  const years = ['2024', '2025', '2023', '2022', '2021', '2020', '2019', '2018', '00', '01', '02', '03', '99', '98', '97', '96', '95', '10', '11'];
  const numbers = ['1', '12', '123', '1234', '12345', '123456', '1111', '2222', '777', '666', '69', '420', '007', '111', '222', '333'];

  const leetReplacements: Record<string, string> = {
    'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'l': '1', 'g': '9'
  };

  const toLeet = (text: string): string => {
    return text.split('').map(char => leetReplacements[char.toLowerCase()] || char).join('');
  };

  const capitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const reverseString = (text: string): string => {
    return text.split('').reverse().join('');
  };

  const infoWords = info.match(/\b\w+\b/g) || [];
  const priorityWords = infoWords.filter(w => w.length > 3);

  priorityWords.forEach((word) => {
    passwords.push(word);
    passwords.push(capitalize(word));
    passwords.push(word.toUpperCase());
    passwords.push(toLeet(word));
    passwords.push(reverseString(word));

    numbers.forEach(num => {
      passwords.push(word + num);
      passwords.push(num + word);
      passwords.push(capitalize(word) + num);
    });

    commonSymbols.forEach(sym => {
      passwords.push(word + sym);
      passwords.push(word + sym + sym);
      passwords.push(capitalize(word) + sym);
      numbers.forEach(num => {
        passwords.push(word + num + sym);
        passwords.push(word + sym + num);
      });
    });

    years.forEach(year => {
      passwords.push(word + year);
      passwords.push(year + word);
      passwords.push(capitalize(word) + year);
      passwords.push(word + '_' + year);
      commonSymbols.forEach(sym => {
        passwords.push(word + year + sym);
      });
    });

    if (phone) {
      passwords.push(word + phone.slice(-4));
      passwords.push(word + phone.slice(-6));
      passwords.push(phone.slice(-4) + word);
      passwords.push(word + '_' + phone.slice(-4));
    }

    if (name) {
      passwords.push(word + name);
      passwords.push(name + word);
      passwords.push(word + '_' + name);
      passwords.push(capitalize(word) + capitalize(name));
      passwords.push(word + '.' + name);
      passwords.push(name + '.' + word);
    }

    if (platformLower) {
      const platformKeys = Object.keys(platformPatterns);
      platformKeys.forEach((key) => {
        if (platformLower.includes(key)) {
          platformPatterns[key].forEach((p) => {
            passwords.push(word + p);
            passwords.push(p + word);
            passwords.push(word + '_' + p);
            passwords.push(capitalize(word) + capitalize(p));
          });
        }
      });
    }

    priorityWords.forEach((word2) => {
      if (word !== word2 && word2.length > 3) {
        passwords.push(word + word2);
        passwords.push(word + '_' + word2);
        passwords.push(capitalize(word) + capitalize(word2));
        numbers.forEach(num => {
          passwords.push(word + word2 + num);
          passwords.push(word + num + word2);
        });
      }
    });

    if (pinnedPassword && !pinnedPassword.includes(word)) {
      passwords.push(pinnedPassword + word);
      passwords.push(word + pinnedPassword);
      passwords.push(pinnedPassword + '_' + word);
      passwords.push(word + '_' + pinnedPassword);
      numbers.forEach(num => {
        passwords.push(pinnedPassword + word + num);
        passwords.push(word + pinnedPassword + num);
      });
    }
  });

  if (known && known !== 'незнаю' && known !== 'не знаю') {
    const knownParts = known.split(/[\s,;]+/);
    knownParts.forEach((pwd) => {
      if (pwd.length > 2) {
        passwords.push(pwd);
        passwords.push(capitalize(pwd));
        passwords.push(pwd.toUpperCase());
        passwords.push(toLeet(pwd));
        passwords.push(reverseString(pwd));
        
        commonSymbols.forEach(sym => {
          passwords.push(pwd + sym);
          passwords.push(sym + pwd);
          passwords.push(pwd + sym + sym);
        });
        
        numbers.forEach(num => {
          passwords.push(pwd + num);
          passwords.push(num + pwd);
          passwords.push(pwd + '_' + num);
        });
        
        years.forEach(year => {
          passwords.push(pwd + year);
          passwords.push(year + pwd);
        });
        
        if (name) {
          passwords.push(name + pwd);
          passwords.push(pwd + name);
          passwords.push(name + '_' + pwd);
          passwords.push(pwd + '_' + name);
          passwords.push(name + '.' + pwd);
          passwords.push(capitalize(name) + capitalize(pwd));
        }
        
        if (platformLower) {
          const platformKeys = Object.keys(platformPatterns);
          platformKeys.forEach((key) => {
            if (platformLower.includes(key)) {
              platformPatterns[key].forEach((p) => {
                passwords.push(pwd + p);
                passwords.push(p + pwd);
                passwords.push(pwd + '_' + p);
                passwords.push(p + '_' + pwd);
                passwords.push(pwd + '@' + p);
              });
            }
          });
        }

        if (phone) {
          passwords.push(pwd + phone.slice(-4));
          passwords.push(pwd + phone.slice(-6));
          passwords.push(phone.slice(-4) + pwd);
        }
      }
    });
  }

  if (platformLower) {
    const platformKeys = Object.keys(platformPatterns);
    platformKeys.forEach((key) => {
      if (platformLower.includes(key)) {
        platformPatterns[key].forEach((p) => {
          passwords.push(p);
          passwords.push(capitalize(p));
          passwords.push(p.toUpperCase());
          passwords.push(toLeet(p));
          
          numbers.forEach(num => {
            passwords.push(p + num);
            passwords.push(num + p);
          });

          commonSymbols.forEach(sym => {
            passwords.push(p + sym);
            passwords.push(p + '123' + sym);
          });
          
          if (name) {
            passwords.push(name + p);
            passwords.push(p + name);
            passwords.push(name + '_' + p);
            passwords.push(capitalize(name) + capitalize(p));
            passwords.push(name + '.' + p);
            passwords.push(name + '@' + p);
            passwords.push(p + '.' + name);
            
            const nameParts = name.split(/[\s_-]+/);
            if (nameParts.length > 1) {
              passwords.push(nameParts[0] + p);
              passwords.push(p + nameParts[0]);
              passwords.push(nameParts[0].charAt(0) + p);
            }
          }
          
          if (phone) {
            passwords.push(p + phone.slice(-4));
            passwords.push(p + phone.slice(-6));
            passwords.push(p + '_' + phone.slice(-4));
            passwords.push(phone.slice(-4) + p);
          }

          years.forEach(year => {
            passwords.push(p + year);
            passwords.push(year + p);
            passwords.push(p + '_' + year);
          });
        });
      }
    });
  }

  if (name) {
    passwords.push(name);
    passwords.push(capitalize(name));
    passwords.push(name.toUpperCase());
    passwords.push(toLeet(name));
    passwords.push(reverseString(name));
    
    numbers.forEach(num => {
      passwords.push(name + num);
      passwords.push(num + name);
      passwords.push(name + '_' + num);
      passwords.push(capitalize(name) + num);
    });

    commonSymbols.forEach(sym => {
      passwords.push(name + sym);
      passwords.push(name + sym + sym);
      passwords.push(sym + name);
    });

    years.forEach(year => {
      passwords.push(name + year);
      passwords.push(year + name);
      passwords.push(name + '_' + year);
      passwords.push(capitalize(name) + year);
    });
    
    const nameParts = name.split(/[\s_-]+/);
    if (nameParts.length > 1) {
      passwords.push(nameParts[0] + nameParts[1]);
      passwords.push(nameParts[1] + nameParts[0]);
      passwords.push(nameParts[0].charAt(0) + nameParts[1]);
      passwords.push(nameParts[0] + nameParts[1].charAt(0));
      passwords.push(capitalize(nameParts[0]) + capitalize(nameParts[1]));
      
      nameParts.forEach((part) => {
        if (part.length > 2) {
          passwords.push(part);
          passwords.push(capitalize(part));
          passwords.push(toLeet(part));
          numbers.forEach(num => {
            passwords.push(part + num);
            passwords.push(num + part);
          });
        }
      });

      numbers.forEach(num => {
        passwords.push(nameParts[0] + num + nameParts[1]);
        passwords.push(nameParts[0] + nameParts[1] + num);
      });
    }

    const firstLetters = name.split(/[\s_-]+/).map(p => p.charAt(0)).join('');
    if (firstLetters.length > 1) {
      passwords.push(firstLetters);
      passwords.push(firstLetters.toUpperCase());
      numbers.forEach(num => {
        passwords.push(firstLetters + num);
        passwords.push(firstLetters.toUpperCase() + num);
      });
    }
  }

  if (phone) {
    passwords.push(phone.slice(-6));
    passwords.push(phone.slice(-8));
    passwords.push(phone.slice(-4));
    passwords.push(phone.slice(-4) + phone.slice(-4));
    passwords.push(phone.slice(0, 4) + phone.slice(-4));
    
    if (name) {
      passwords.push(name + phone.slice(-4));
      passwords.push(name + phone.slice(-2));
      passwords.push(phone.slice(-4) + name);
      passwords.push(name + '_' + phone.slice(-4));
      passwords.push(capitalize(name) + phone.slice(-4));
      passwords.push(name + phone.slice(-6));
    }

    commonSymbols.forEach(sym => {
      passwords.push(phone.slice(-4) + sym);
      passwords.push(phone.slice(-6) + sym);
    });
  }

  const words = ['qwerty', 'password', 'admin', 'login', 'user', '123456', 'iloveyou', 'welcome', 'monkey', 'dragon'];
  words.forEach(word => {
    passwords.push(word);
    passwords.push(capitalize(word));
    passwords.push(word + '123');
    passwords.push(word + '!');
    if (name) {
      passwords.push(name + word);
      passwords.push(word + name);
    }
  });

  if (pinnedPassword) {
    commonSymbols.forEach(sym => {
      passwords.push(pinnedPassword + sym);
      passwords.push(sym + pinnedPassword);
    });

    numbers.forEach(num => {
      passwords.push(pinnedPassword + num);
      passwords.push(num + pinnedPassword);
    });

    years.forEach(year => {
      passwords.push(pinnedPassword + year);
      passwords.push(year + pinnedPassword);
    });

    passwords.push(capitalize(pinnedPassword));
    passwords.push(pinnedPassword.toUpperCase());
    passwords.push(toLeet(pinnedPassword));
    passwords.push(reverseString(pinnedPassword));
  }

  const uniquePasswords = [...new Set(passwords)]
    .filter(p => p && p.length >= 4 && p.length <= 30);
  
  const prioritized = uniquePasswords.sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    if (pinnedPassword) {
      if (a.includes(pinnedPassword)) scoreA += 1000;
      if (b.includes(pinnedPassword)) scoreB += 1000;
    }

    priorityWords.forEach(word => {
      if (a.toLowerCase().includes(word)) scoreA += 100;
      if (b.toLowerCase().includes(word)) scoreB += 100;
    });

    if (name && a.toLowerCase().includes(name)) scoreA += 50;
    if (name && b.toLowerCase().includes(name)) scoreB += 50;

    if (phone && (a.includes(phone.slice(-4)) || a.includes(phone.slice(-6)))) scoreA += 50;
    if (phone && (b.includes(phone.slice(-4)) || b.includes(phone.slice(-6)))) scoreB += 50;

    if (/[!@#$%^&*]/.test(a)) scoreA += 20;
    if (/[!@#$%^&*]/.test(b)) scoreB += 20;

    if (/\d/.test(a)) scoreA += 10;
    if (/\d/.test(b)) scoreB += 10;

    const hasUpperCase = /[A-Z]/.test(a) ? 5 : 0;
    const hasUpperCaseB = /[A-Z]/.test(b) ? 5 : 0;
    scoreA += hasUpperCase;
    scoreB += hasUpperCaseB;

    if (a.length >= 8 && a.length <= 16) scoreA += 15;
    if (b.length >= 8 && b.length <= 16) scoreB += 15;

    const uniqueCharsA = new Set(a.split('')).size;
    const uniqueCharsB = new Set(b.split('')).size;
    scoreA += uniqueCharsA;
    scoreB += uniqueCharsB;

    return scoreB - scoreA;
  });
  
  const selectedPasswords: string[] = [];
  const seenPatterns = new Set<string>();
  
  for (const pwd of prioritized) {
    if (selectedPasswords.length >= 10) break;
    
    const pattern = pwd.replace(/\d/g, 'N').replace(/[!@#$%^&*_.\-]/g, 'S').toLowerCase();
    
    if (!seenPatterns.has(pattern) || selectedPasswords.length < 5) {
      selectedPasswords.push(pwd);
      seenPatterns.add(pattern);
    }
  }
  
  if (selectedPasswords.length < 10) {
    for (const pwd of prioritized) {
      if (selectedPasswords.length >= 10) break;
      if (!selectedPasswords.includes(pwd)) {
        selectedPasswords.push(pwd);
      }
    }
  }
  
  return selectedPasswords.slice(0, 10);
};
