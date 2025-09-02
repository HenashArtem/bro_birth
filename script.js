(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  $('#path').textContent = '~/projects/bro-birthday';
  $('#year').textContent = new Date().getFullYear();
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') root.classList.add('light');
  const toggleTheme = () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  };
  const steps = [
    '⏳ starting build pipeline...',
    '🔍 linting wishes... no issues found',
    '🧪 running unit tests for удача.spec.js... 100% passed',
    '📦 bundling love + support + memes...',
    '🚚 shipping to production /life',
    '✅ release complete — opening greeting...'
  ];
  let building = false;
  const simulateBuild = () => {
    if (building) return;
    building = true;
    const log = $('#log');
    const bar = $('#bar');
    const greet = $('#greet');
    $('#runBtn').disabled = true;
    greet.style.display = 'none';
    log.textContent = `$ npm run birthday\n`;
    bar.style.width = '0%';
    let i = 0;
    const tick = () => {
      if (i < steps.length) {
        log.textContent += `\n> ${steps[i]}`;
        bar.style.width = `${Math.min(100, (i + 1) / steps.length * 100)}%`;
        i++;
        setTimeout(tick, 600);
      } else {
        greet.style.display = 'block';
        party();
        building = false;
        $('#runBtn').disabled = false;
      }
      const body = log.parentElement; body.scrollTop = body.scrollHeight;
    };
    tick();
  };
  const jokes = [
    'Коли кажеш «на 5 хв відійду», Jira вже створила epic 😅',
    'git push --force — тільки на проблеми, хай самі відкотяться',
    'Stack Overflow як кава: можна без нього, але кому це треба?',
    'Ти як try/catch: з тобою спокійно — все перехопиш',
    'Scrum — це коли ти плануєш релакс, а реліз планує тебе',
    'Є два типи людей: хто робить бекапи, і хто СТАНЕ їх робити 😉',
    'Нехай Wi-Fi по життю — 5ГГц і без packet loss',
    'CI/CD: Celebrate Instantly / Chill Daily',
    'QA повідомляє: критичних багів у настрої не знайдено ✅',
    'Успіх — це коли мрії мерджаться без конфліктів'
  ];
  const showRandomJoke = () => {
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    const log = $('#log');
    log.textContent += `\n💬 ${joke}`;
    const body = log.parentElement; body.scrollTop = body.scrollHeight;
  };
  const shareGreeting = async () => {
    const text = $('#shareTemplate').innerHTML.trim();
    if (navigator.share) { try { await navigator.share({ text }); return; } catch (e) {} }
    if (navigator.clipboard) { try { await navigator.clipboard.writeText(text); alert('Скопійовано у буфер 📋'); return; } catch (e) {} }
    prompt('Скопіюй вітання вручну:', text);
  };
  const party = () => {
    const wrap = $('#confetti');
    const emojis = ['🎉','✨','🥳','🚀','🔥','🎊','💾','🧠','💻','⚡️'];
    for (let i = 0; i < 60; i++) {
      const el = document.createElement('div');
      el.className = 'piece';
      el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
      el.style.left = Math.random()*100 + 'vw';
      el.style.top = -10 - Math.random()*40 + 'px';
      el.style.animation = `fall ${2 + Math.random()*2.5}s linear forwards`;
      el.style.opacity = .6;
      el.style.transform = `translateY(-10px) rotate(${Math.random()*180}deg)`;
      wrap.appendChild(el);
      setTimeout(() => el.remove(), 4500);
    }
  };
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'g') $('#greet').style.display = 'block';
    if (key === 'j') showRandomJoke();
    if (key === 't') toggleTheme();
  });
  $('#runBtn').addEventListener('click', simulateBuild);
  $('#jokeBtn').addEventListener('click', showRandomJoke);
  $('#shareBtn').addEventListener('click', shareGreeting);
  $('#themeBtn').addEventListener('click', toggleTheme);
  document.body.classList.add('js-ready');
})();
