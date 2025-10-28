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
    'вконтакте': ['vk', 'vkontakte', 'вк', 'vkcom', 'vk.com', 'вконтакте'],
    'вк': ['vk', 'vkontakte', 'вк', 'vkcom'],
    'instagram': ['insta', 'ig', 'inst', 'instagram', 'gram', 'instagr'],
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

  const commonSymbols = ['!', '@', '#', '$', '*', '_', '.', '-', '&', '?', '+', '='];
  const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '00', '01', '02', '03', '04', '05', '99', '98', '97', '96', '95', '10', '11', '12', '13'];
  const numbers = ['1', '12', '123', '1234', '12345', '123456', '1111', '2222', '777', '666', '69', '420', '007', '111', '222', '333', '444', '555', '888', '999'];
  const commonWords = ['love', 'pass', 'password', 'qwerty', 'admin', 'user', 'welcome', 'hello', 'secret', 'master', 'boss', 'king', 'queen'];

  const leetReplacements: Record<string, string> = {
    'a': '4', 'e': '3', 'i': '1', 'o': '0', 's': '5', 't': '7', 'l': '1', 'g': '9', 'b': '8'
  };

  const advancedLeetReplacements: Record<string, string[]> = {
    'a': ['4', '@', 'А'],
    'e': ['3', 'Е'],
    'i': ['1', '!', '|'],
    'o': ['0', 'О'],
    's': ['5', '$', 'С'],
    't': ['7', '+'],
    'l': ['1', '|'],
    'g': ['9', '6'],
    'b': ['8', 'Б']
  };

  const toLeet = (text: string): string => {
    return text.split('').map(char => leetReplacements[char.toLowerCase()] || char).join('');
  };

  const toAdvancedLeet = (text: string): string[] => {
    const results: string[] = [text];
    for (const [key, replacements] of Object.entries(advancedLeetReplacements)) {
      if (text.toLowerCase().includes(key)) {
        replacements.forEach(replacement => {
          results.push(text.replace(new RegExp(key, 'gi'), replacement));
        });
      }
    }
    return results;
  };

  const capitalize = (text: string): string => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const capitalizeRandom = (text: string): string[] => {
    const results: string[] = [];
    for (let i = 0; i < text.length; i++) {
      const variant = text.split('').map((char, idx) => {
        if (idx === i || idx === 0) return char.toUpperCase();
        return char;
      }).join('');
      results.push(variant);
    }
    return results;
  };

  const reverseString = (text: string): string => {
    return text.split('').reverse().join('');
  };

  const alternateCase = (text: string): string => {
    return text.split('').map((char, idx) => idx % 2 === 0 ? char.toUpperCase() : char.toLowerCase()).join('');
  };

  const mirrorString = (text: string): string => {
    return text + reverseString(text);
  };

  const doubleString = (text: string): string => {
    return text + text;
  };

  const insertSymbols = (text: string, symbols: string[]): string[] => {
    const results: string[] = [];
    symbols.forEach(sym => {
      for (let i = 1; i < text.length; i++) {
        results.push(text.slice(0, i) + sym + text.slice(i));
      }
    });
    return results;
  };

  const extractDates = (text: string): string[] => {
    const dateRegex = /\b(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{2,4})\b/g;
    const matches = [...text.matchAll(dateRegex)];
    return matches.map(m => m[0].replace(/[.\-\/]/g, ''));
  };

  const infoWords = info.match(/\b[а-яёa-z]{3,}\b/gi) || [];
  const priorityWords = [...new Set(infoWords.filter(w => w.length > 2))];

  const infoDates = extractDates(info);
  infoDates.forEach(date => {
    passwords.push(date);
    passwords.push(date.slice(0, 4));
    passwords.push(date.slice(-4));
  });

  priorityWords.forEach((word) => {
    passwords.push(word);
    passwords.push(capitalize(word));
    passwords.push(word.toUpperCase());
    passwords.push(toLeet(word));
    passwords.push(reverseString(word));
    passwords.push(alternateCase(word));
    passwords.push(mirrorString(word));
    passwords.push(doubleString(word));

    toAdvancedLeet(word).forEach(leet => passwords.push(leet));
    capitalizeRandom(word).forEach(cap => passwords.push(cap));

    insertSymbols(word, ['!', '@', '#']).forEach(variant => passwords.push(variant));

    numbers.forEach(num => {
      passwords.push(word + num);
      passwords.push(num + word);
      passwords.push(capitalize(word) + num);
      passwords.push(toLeet(word) + num);
      passwords.push(num + toLeet(word));
      passwords.push(word + '_' + num);
      passwords.push(word + '-' + num);
    });

    commonSymbols.forEach(sym => {
      passwords.push(word + sym);
      passwords.push(word + sym + sym);
      passwords.push(sym + word);
      passwords.push(capitalize(word) + sym);
      numbers.slice(0, 10).forEach(num => {
        passwords.push(word + num + sym);
        passwords.push(word + sym + num);
        passwords.push(sym + word + num);
      });
    });

    years.forEach(year => {
      passwords.push(word + year);
      passwords.push(year + word);
      passwords.push(capitalize(word) + year);
      passwords.push(word + '_' + year);
      passwords.push(word + '.' + year);
      passwords.push(toLeet(word) + year);
      commonSymbols.slice(0, 5).forEach(sym => {
        passwords.push(word + year + sym);
        passwords.push(word + sym + year);
      });
    });

    if (phone) {
      const phoneVariants = [
        phone.slice(-4),
        phone.slice(-6),
        phone.slice(-8),
        phone.slice(0, 3),
        phone.slice(1, 4)
      ];
      phoneVariants.forEach(ph => {
        if (ph) {
          passwords.push(word + ph);
          passwords.push(ph + word);
          passwords.push(word + '_' + ph);
          passwords.push(word + '-' + ph);
          passwords.push(capitalize(word) + ph);
        }
      });
    }

    if (name) {
      const nameParts = name.split(/[\s_.-]+/);
      passwords.push(word + name);
      passwords.push(name + word);
      passwords.push(word + '_' + name);
      passwords.push(capitalize(word) + capitalize(name));
      passwords.push(word + '.' + name);
      passwords.push(name + '.' + word);
      passwords.push(word + '@' + name);
      passwords.push(toLeet(word) + toLeet(name));

      nameParts.forEach(part => {
        if (part.length > 1) {
          passwords.push(word + part);
          passwords.push(part + word);
          passwords.push(word + part.charAt(0));
          passwords.push(part.charAt(0) + word);
        }
      });
    }

    if (platformLower) {
      Object.keys(platformPatterns).forEach((key) => {
        if (platformLower.includes(key)) {
          platformPatterns[key].forEach((p) => {
            passwords.push(word + p);
            passwords.push(p + word);
            passwords.push(word + '_' + p);
            passwords.push(capitalize(word) + capitalize(p));
            passwords.push(word + '@' + p);
            passwords.push(toLeet(word) + p);
            numbers.slice(0, 8).forEach(num => {
              passwords.push(word + p + num);
              passwords.push(p + word + num);
            });
          });
        }
      });
    }

    priorityWords.forEach((word2) => {
      if (word !== word2 && word2.length > 2) {
        passwords.push(word + word2);
        passwords.push(word2 + word);
        passwords.push(word + '_' + word2);
        passwords.push(capitalize(word) + capitalize(word2));
        passwords.push(toLeet(word) + toLeet(word2));
        numbers.slice(0, 6).forEach(num => {
          passwords.push(word + word2 + num);
          passwords.push(word + num + word2);
        });
        commonSymbols.slice(0, 3).forEach(sym => {
          passwords.push(word + sym + word2);
          passwords.push(word + word2 + sym);
        });
      }
    });

    commonWords.forEach(common => {
      passwords.push(word + common);
      passwords.push(common + word);
      passwords.push(capitalize(word) + capitalize(common));
    });

    if (pinnedPassword && !pinnedPassword.includes(word)) {
      passwords.push(pinnedPassword + word);
      passwords.push(word + pinnedPassword);
      passwords.push(pinnedPassword + '_' + word);
      passwords.push(word + '_' + pinnedPassword);
      passwords.push(pinnedPassword + '.' + word);
      numbers.slice(0, 6).forEach(num => {
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
        passwords.push(alternateCase(pwd));
        passwords.push(mirrorString(pwd));

        toAdvancedLeet(pwd).forEach(leet => passwords.push(leet));
        
        commonSymbols.forEach(sym => {
          passwords.push(pwd + sym);
          passwords.push(sym + pwd);
          passwords.push(pwd + sym + sym);
          passwords.push(pwd + sym + sym + sym);
        });
        
        numbers.forEach(num => {
          passwords.push(pwd + num);
          passwords.push(num + pwd);
          passwords.push(pwd + '_' + num);
          passwords.push(toLeet(pwd) + num);
        });
        
        years.forEach(year => {
          passwords.push(pwd + year);
          passwords.push(year + pwd);
          passwords.push(pwd + '.' + year);
          passwords.push(pwd + '-' + year);
        });
        
        if (name) {
          passwords.push(name + pwd);
          passwords.push(pwd + name);
          passwords.push(name + '_' + pwd);
          passwords.push(pwd + '_' + name);
          passwords.push(name + '.' + pwd);
          passwords.push(capitalize(name) + capitalize(pwd));
          passwords.push(toLeet(name) + toLeet(pwd));
        }
        
        if (platformLower) {
          Object.keys(platformPatterns).forEach((key) => {
            if (platformLower.includes(key)) {
              platformPatterns[key].forEach((p) => {
                passwords.push(pwd + p);
                passwords.push(p + pwd);
                passwords.push(pwd + '_' + p);
                passwords.push(p + '_' + pwd);
                passwords.push(pwd + '@' + p);
                passwords.push(p + '@' + pwd);
              });
            }
          });
        }

        if (phone) {
          passwords.push(pwd + phone.slice(-4));
          passwords.push(pwd + phone.slice(-6));
          passwords.push(phone.slice(-4) + pwd);
          passwords.push(pwd + '_' + phone.slice(-4));
        }

        priorityWords.forEach(word => {
          if (word.length > 2) {
            passwords.push(pwd + word);
            passwords.push(word + pwd);
            passwords.push(pwd + '_' + word);
          }
        });
      }
    });
  }

  if (platformLower) {
    Object.keys(platformPatterns).forEach((key) => {
      if (platformLower.includes(key)) {
        platformPatterns[key].forEach((p) => {
          passwords.push(p);
          passwords.push(capitalize(p));
          passwords.push(p.toUpperCase());
          passwords.push(toLeet(p));
          
          numbers.forEach(num => {
            passwords.push(p + num);
            passwords.push(num + p);
            passwords.push(p + '_' + num);
          });

          commonSymbols.forEach(sym => {
            passwords.push(p + sym);
            passwords.push(p + '123' + sym);
            passwords.push(p + sym + '123');
          });
          
          if (name) {
            const nameParts = name.split(/[\s_.-]+/);
            passwords.push(name + p);
            passwords.push(p + name);
            passwords.push(name + '_' + p);
            passwords.push(capitalize(name) + capitalize(p));
            passwords.push(name + '.' + p);
            passwords.push(name + '@' + p);
            passwords.push(p + '.' + name);
            passwords.push(toLeet(name) + p);
            
            if (nameParts.length > 1) {
              nameParts.forEach(part => {
                passwords.push(part + p);
                passwords.push(p + part);
                passwords.push(part.charAt(0) + p);
                passwords.push(p + part.charAt(0));
              });
            }
          }
          
          if (phone) {
            passwords.push(p + phone.slice(-4));
            passwords.push(p + phone.slice(-6));
            passwords.push(phone.slice(-4) + p);
            passwords.push(p + '_' + phone.slice(-4));
          }

          years.forEach(year => {
            passwords.push(p + year);
            passwords.push(year + p);
          });
        });
      }
    });
  }

  if (name) {
    const nameParts = name.split(/[\s_.-]+/);
    
    nameParts.forEach((part) => {
      if (part.length > 1) {
        passwords.push(part);
        passwords.push(capitalize(part));
        passwords.push(part.toUpperCase());
        passwords.push(toLeet(part));
        passwords.push(reverseString(part));
        
        numbers.forEach(num => {
          passwords.push(part + num);
          passwords.push(num + part);
          passwords.push(capitalize(part) + num);
        });
        
        years.forEach(year => {
          passwords.push(part + year);
          passwords.push(year + part);
        });
        
        commonSymbols.slice(0, 6).forEach(sym => {
          passwords.push(part + sym);
          passwords.push(part + '123' + sym);
        });
      }
    });

    if (nameParts.length > 1) {
      passwords.push(nameParts[0] + nameParts[nameParts.length - 1]);
      passwords.push(nameParts[0].charAt(0) + nameParts[nameParts.length - 1]);
      passwords.push(capitalize(nameParts[0]) + capitalize(nameParts[nameParts.length - 1]));
      
      numbers.forEach(num => {
        passwords.push(nameParts[0] + nameParts[nameParts.length - 1] + num);
        passwords.push(nameParts[0].charAt(0) + nameParts[nameParts.length - 1] + num);
      });
    }
  }

  if (phone) {
    const phoneVariants = [
      phone.slice(-4),
      phone.slice(-6),
      phone.slice(-8),
      phone.slice(0, 3),
      phone.slice(1, 4),
      phone.slice(0, 4),
      phone
    ];

    phoneVariants.forEach(ph => {
      if (ph && ph.length >= 3) {
        passwords.push(ph);
        commonSymbols.slice(0, 4).forEach(sym => {
          passwords.push(ph + sym);
          passwords.push(sym + ph);
        });
        years.slice(0, 10).forEach(year => {
          passwords.push(ph + year);
          passwords.push(year + ph);
        });
      }
    });
  }

  years.forEach(year => {
    commonSymbols.slice(0, 4).forEach(sym => {
      passwords.push(year + sym);
      passwords.push(sym + year);
    });
    numbers.slice(0, 8).forEach(num => {
      passwords.push(year + num);
      passwords.push(num + year);
    });
  });

  const uniquePasswords = [...new Set(passwords)];
  const filteredPasswords = uniquePasswords.filter(p => 
    p && 
    p.length >= 4 && 
    p.length <= 32 &&
    !/^\d+$/.test(p) &&
    !/^[!@#$%^&*()_+=\-,.]+$/.test(p)
  );

  const scorePassword = (pwd: string): number => {
    let score = 0;
    
    if (pinnedPassword && pwd.includes(pinnedPassword)) score += 1000;
    
    if (priorityWords.some(w => pwd.toLowerCase().includes(w.toLowerCase()))) score += 500;
    
    if (known && known !== 'незнаю' && pwd.toLowerCase().includes(known.toLowerCase())) score += 800;
    
    if (name && pwd.toLowerCase().includes(name.toLowerCase())) score += 300;
    
    if (phone && phone.slice(-4) && pwd.includes(phone.slice(-4))) score += 200;
    
    if (platformLower) {
      Object.keys(platformPatterns).forEach(key => {
        if (platformLower.includes(key) && platformPatterns[key].some(p => pwd.toLowerCase().includes(p))) {
          score += 150;
        }
      });
    }
    
    if (/\d/.test(pwd)) score += 50;
    if (/[!@#$%^&*()_+=\-,.]/.test(pwd)) score += 30;
    if (/[A-Z]/.test(pwd)) score += 20;
    
    if (pwd.length >= 8 && pwd.length <= 16) score += 100;
    if (pwd.length >= 6 && pwd.length < 8) score += 50;
    
    const hasLeet = Object.values(leetReplacements).some(r => pwd.includes(r));
    if (hasLeet) score += 40;
    
    return score;
  };

  const scoredPasswords = filteredPasswords
    .map(pwd => ({ pwd, score: scorePassword(pwd) }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.pwd);

  return scoredPasswords.slice(0, 8);
};