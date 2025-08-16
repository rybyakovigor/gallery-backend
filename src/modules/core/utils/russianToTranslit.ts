const russianToTranslit = (text: string): string => {
  const translitMap: Record<string, string> = {
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'yo',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  return text
    .trim()
    .toLowerCase()
    .split('')
    .map((char) => (char === ' ' ? '-' : (translitMap[char] ?? char)))
    .join('')
    .replace(/[^a-z0-9-]/g, '') // убираем всё, кроме латинских букв, цифр и дефисов
    .replace(/-+/g, '-') // заменяем несколько дефисов на один
    .replace(/^-|-$/g, ''); // убираем дефисы в начале и конце
};

export default russianToTranslit;
