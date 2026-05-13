import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { legacyMarkup, runLegacyInteractions } from './legacyPage';

const pageMarkup = legacyMarkup
  .replace(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Pavan_khind.jpg/800px-Pavan_khind.jpg',
    'assets/Screenshot 2026-05-09 181024.png',
  )
  .replace(
    '<div style="width:100%;height:100%;background:linear-gradient(135deg,#1A0500,#3D1000);display:flex;align-items:center;justify-content:center;font-size:5rem;"></div>',
    '<img class="battle-bg" src="assets/Screenshot 2026-05-09 181106.png" alt="Raid on Shaista Khan">',
  )
  .replace(
    '<div style="width:100%;height:100%;background:linear-gradient(135deg,#001A3D,#000D26);display:flex;align-items:center;justify-content:center;font-size:5rem;"></div>',
    '<img class="battle-bg" src="assets/Screenshot 2026-05-09 181119.png" alt="Sack of Surat First">',
  )
  .replace(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Battle_of_Kolhapur.jpg/800px-Battle_of_Kolhapur.jpg',
    'assets/Screenshot 2026-05-05 235908.png',
  )
  .replace(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Battle_of_Salher.jpg/800px-Battle_of_Salher.jpg',
    'assets/Screenshot 2026-05-09 181130.png',
  )
  .replace(
    '<div style="width:100%;height:100%;background:linear-gradient(135deg,#1A1500,#0D0A00);display:flex;align-items:center;justify-content:center;font-size:5rem;"></div>',
    '<img class="battle-bg" src="assets/Screenshot 2026-05-05 235850.png" alt="Treaty of Purandar">',
  )
  .replace(
    '<div style="width:100%;height:100%;background:linear-gradient(135deg,#0D001A,#050008);display:flex;align-items:center;justify-content:center;font-size:5rem;"></div>',
    '<img class="battle-bg" src="assets/Screenshot 2026-05-05 235857.png" alt="Escape from Agra">',
  )
  .replace(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Sindhudurg_Fort.jpg/800px-Sindhudurg_Fort.jpg',
    'assets/Screenshot 2026-05-05 235845.png',
  )
  .replace(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Torna_fort.jpg/800px-Torna_fort.jpg',
    'assets/Screenshot 2026-05-05 235829.png',
  )
  .replace(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Vijaydurg_fort.jpg/800px-Vijaydurg_fort.jpg',
    'assets/Screenshot 2026-05-05 235838.png',
  )
  .replaceAll(
    '<a href="#guestbook">Guestbook</a>',
    '<a href="#fan-experience">Fan Tools</a><a href="#fort-visit-guide">Visit Guide</a><a href="#festival-mode">Festival</a><a href="#book">Book</a><a href="#guestbook">Guestbook</a><a href="#admin-feedback">Admin</a>',
  );

const [beforeGuestbook, afterGuestbook] = pageMarkup.split('<!-- GUESTBOOK -->');
const [, footerMarkup = afterGuestbook] = afterGuestbook.split('<!-- FOOTER -->');

const quotes = [
  {
    text: 'Freedom is a blessing which everyone has the right to receive.',
    note: 'A daily reminder of Swarajya and dignity.',
  },
  {
    text: 'Never bend your head. Always hold it high.',
    note: 'Courage begins with self-respect.',
  },
  {
    text: 'A fort is not stone alone; it is discipline, supply, courage and trust.',
    note: 'Leadership lesson from the fort-based Swarajya vision.',
  },
  {
    text: 'When the cause is just, even a small force can challenge a great empire.',
    note: 'A thought for students, readers and history lovers.',
  },
  {
    text: 'Swarajya was not only a kingdom; it was the confidence of a people.',
    note: 'Use this as today\'s inspiration.',
  },
];

const forts = [
  {
    name: 'Raigad Fort',
    region: 'Raigad, Maharashtra',
    image: 'assets/Raigad.png',
    mapX: 41,
    mapY: 58,
    importance: 'Capital of the Maratha Empire and the site of Chhatrapati Shivaji Maharaj\'s coronation in 1674.',
    bestTime: 'October to March',
    travelTip: 'Cooler weather is better for the climb, ropeway ride and exploring the plateau comfortably.',
    howToReach: 'Reach Pachad village from Mahad, then use the ropeway or climb the fort steps to the top.',
    trekDifficulty: 'Moderate by steps; easy if using ropeway',
    specialVisits: ['Coronation throne area', 'Jagdishwar Temple', 'Hirakani Buruj', 'Raigad Ropeway views'],
  },
  {
    name: 'Shivneri Fort',
    region: 'Junnar, Pune',
    image: 'assets/Shivneri.png',
    mapX: 45,
    mapY: 30,
    importance: 'Birthplace of Chhatrapati Shivaji Maharaj, where Jijabai shaped his early values and vision.',
    bestTime: 'October to February',
    travelTip: 'Winter mornings are pleasant for the trek, caves and birthplace visit.',
    howToReach: 'Travel to Junnar from Pune, then take the road toward Shivneri base and climb through the fort gates.',
    trekDifficulty: 'Easy to moderate',
    specialVisits: ['Birthplace memorial', 'Shivai Devi Temple', 'Seven gates route', 'Water tanks and caves'],
  },
  {
    name: 'Pratapgad Fort',
    region: 'Satara',
    image: 'assets/Pratapgad.png',
    mapX: 38,
    mapY: 65,
    importance: 'Known for the 1659 encounter with Afzal Khan and the decisive Maratha victory that followed.',
    bestTime: 'September to February',
    travelTip: 'Post-monsoon greenery and winter weather make the Mahabaleshwar route scenic.',
    howToReach: 'Drive from Mahabaleshwar or Satara toward Pratapgad; the final approach reaches close to the fort base.',
    trekDifficulty: 'Easy to moderate',
    specialVisits: ['Afzal Khan encounter site', 'Bhavani Temple', 'Upper fort viewpoint', 'Mahabaleshwar valley views'],
  },
  {
    name: 'Torna Fort',
    region: 'Pune',
    image: 'assets/Screenshot 2026-05-05 235829.png',
    mapX: 43,
    mapY: 49,
    importance: 'One of the first forts captured by Shivaji Maharaj as a young leader, marking the rise of Swarajya.',
    bestTime: 'October to February',
    travelTip: 'The trek is long, so start early and avoid heavy monsoon days.',
    howToReach: 'Reach Velhe village from Pune; the main trekking route starts from the village side.',
    trekDifficulty: 'Difficult and long',
    specialVisits: ['Zunjar Machi', 'Budhla Machi', 'Menghai Devi Temple', 'Sahyadri ridge views'],
  },
  {
    name: 'Sinhagad Fort',
    region: 'Pune',
    image: 'assets/Sinhgad.png',
    mapX: 45,
    mapY: 53,
    importance: 'Remembered for Tanaji Malusare\'s sacrifice and the 1670 battle that restored the fort to Swarajya.',
    bestTime: 'June to February',
    travelTip: 'Monsoon is lush and dramatic, while winter is easier for family visits.',
    howToReach: 'Drive from Pune toward Sinhagad Ghat Road; vehicles usually reach near the upper parking area.',
    trekDifficulty: 'Easy by road; moderate if trekking',
    specialVisits: ['Tanaji Malusare memorial', 'Kalyan Darwaza', 'Pune valley views', 'Pithla-bhakri food stalls'],
  },
  {
    name: 'Rajgad Fort',
    region: 'Pune',
    image: 'assets/Rajgad.png',
    mapX: 42,
    mapY: 56,
    importance: 'An early capital of Swarajya and one of the most important hill forts in Shivaji Maharaj\'s life.',
    bestTime: 'October to February',
    travelTip: 'Plan a full day because the fort is large and the trek takes time.',
    howToReach: 'Reach Gunjavane or Pali village from Pune; both routes lead toward the fort with different trek paths.',
    trekDifficulty: 'Moderate to difficult',
    specialVisits: ['Padmavati Machi', 'Sanjivani Machi', 'Suvela Machi', 'Balekilla climb'],
  },
  {
    name: 'Sindhudurg Fort',
    region: 'Konkan Coast',
    image: 'assets/Screenshot 2026-05-05 235845.png',
    mapX: 30,
    mapY: 84,
    importance: 'A major sea fort showing the naval vision and coastal defense strategy of the Maratha state.',
    bestTime: 'October to March',
    travelTip: 'Dry winter weather is best for boat access and coastal sightseeing.',
    howToReach: 'Reach Malvan by road, then take a local boat from the jetty to enter the sea fort.',
    trekDifficulty: 'Easy; boat access required',
    specialVisits: ['Arabian Sea ramparts', 'Shivaji Maharaj temple', 'Malvan boat ride', 'Snorkeling and scuba nearby'],
  },
  {
    name: 'Vijaydurg Fort',
    region: 'Sindhudurg',
    image: 'assets/Screenshot 2026-05-05 235838.png',
    mapX: 31,
    mapY: 78,
    importance: 'A strategic naval stronghold on the western coast, linked with Maratha maritime power.',
    bestTime: 'November to February',
    travelTip: 'Visit in the dry season for clearer sea views and easier coastal travel.',
    howToReach: 'Travel by road to Vijaydurg village in Sindhudurg; the fort entrance is close to the coast.',
    trekDifficulty: 'Easy',
    specialVisits: ['Sea-facing bastions', 'Historic dock area', 'Creek views', 'Coastal sunset points'],
  },
];

const quizQuestions = [
  { level: 'Beginner', question: 'Where was Chhatrapati Shivaji Maharaj born?', options: ['Shivneri Fort', 'Raigad Fort', 'Sinhagad Fort'], answer: 'Shivneri Fort' },
  { level: 'Beginner', question: 'What was Shivaji Maharaj\'s mother\'s name?', options: ['Jijabai', 'Saibai', 'Tarabai'], answer: 'Jijabai' },
  { level: 'Beginner', question: 'Which fort became the capital of the Maratha Empire?', options: ['Raigad Fort', 'Torna Fort', 'Sindhudurg Fort'], answer: 'Raigad Fort' },
  { level: 'Beginner', question: 'What was the ideal of self-rule called?', options: ['Swarajya', 'Jagirdari', 'Subedari'], answer: 'Swarajya' },
  { level: 'Beginner', question: 'Which battle is linked with Afzal Khan?', options: ['Battle of Pratapgad', 'Battle of Salher', 'Battle of Pavan Khind'], answer: 'Battle of Pratapgad' },
  { level: 'Beginner', question: 'Which fort was one of Shivaji Maharaj\'s first major captures?', options: ['Torna Fort', 'Red Fort', 'Daulatabad Fort'], answer: 'Torna Fort' },
  { level: 'Beginner', question: 'Which empire was ruled by Aurangzeb?', options: ['Mughal Empire', 'Portuguese Empire', 'Maurya Empire'], answer: 'Mughal Empire' },
  { level: 'Beginner', question: 'Which coast was important for Shivaji Maharaj\'s navy?', options: ['Konkan Coast', 'Coromandel Coast', 'Malabar only'], answer: 'Konkan Coast' },
  { level: 'Beginner', question: 'What title did Shivaji Maharaj receive at coronation?', options: ['Chhatrapati', 'Sultan', 'Nawab'], answer: 'Chhatrapati' },
  { level: 'Beginner', question: 'In which modern Indian state is Raigad Fort located?', options: ['Maharashtra', 'Gujarat', 'Karnataka'], answer: 'Maharashtra' },
  { level: 'Beginner', question: 'Which fort is connected with Tanaji Malusare?', options: ['Sinhagad Fort', 'Shivneri Fort', 'Vijaydurg Fort'], answer: 'Sinhagad Fort' },
  { level: 'Beginner', question: 'What was Shivaji Maharaj known for building along the coast?', options: ['A strong navy', 'A desert army', 'A Himalayan empire'], answer: 'A strong navy' },
  { level: 'Beginner', question: 'Which slogan is popularly associated with Shivaji Maharaj devotees?', options: ['Jay Bhavani Jay Shivaji', 'Inquilab Zindabad', 'Vande Mataram only'], answer: 'Jay Bhavani Jay Shivaji' },
  { level: 'Beginner', question: 'Which fort is Shivaji Maharaj\'s birthplace?', options: ['Shivneri', 'Purandar', 'Rajgad'], answer: 'Shivneri' },
  { level: 'Beginner', question: 'What type of terrain helped Maratha warfare?', options: ['Sahyadri mountains', 'Open desert only', 'Snow fields'], answer: 'Sahyadri mountains' },
  { level: 'Warrior', question: 'What is Ganimi Kava commonly understood as?', options: ['Guerrilla warfare', 'Coin minting', 'Sea trade tax'], answer: 'Guerrilla warfare' },
  { level: 'Warrior', question: 'Who sacrificed himself at Pavan Khind?', options: ['Baji Prabhu Deshpande', 'Afzal Khan', 'Jai Singh I'], answer: 'Baji Prabhu Deshpande' },
  { level: 'Warrior', question: 'Which Mughal viceroy was attacked in Pune?', options: ['Shaista Khan', 'Bahadur Shah', 'Dara Shikoh'], answer: 'Shaista Khan' },
  { level: 'Warrior', question: 'Which wealthy Mughal port did Shivaji Maharaj raid?', options: ['Surat', 'Calicut', 'Masulipatnam'], answer: 'Surat' },
  { level: 'Warrior', question: 'Which battle is remembered as a major open-field Maratha victory?', options: ['Battle of Salher', 'Battle of Panipat', 'Battle of Plassey'], answer: 'Battle of Salher' },
  { level: 'Warrior', question: 'Which sea fort is linked with Shivaji Maharaj\'s naval vision?', options: ['Sindhudurg', 'Amber', 'Gwalior'], answer: 'Sindhudurg' },
  { level: 'Warrior', question: 'Where did Shivaji Maharaj escape from Mughal confinement?', options: ['Agra', 'Delhi', 'Lahore'], answer: 'Agra' },
  { level: 'Warrior', question: 'Which Mughal commander negotiated the Treaty of Purandar?', options: ['Jai Singh I', 'Shaista Khan', 'Afzal Khan'], answer: 'Jai Singh I' },
  { level: 'Warrior', question: 'Which fort served as an early capital before Raigad?', options: ['Rajgad', 'Sindhudurg', 'Vijaydurg'], answer: 'Rajgad' },
  { level: 'Warrior', question: 'What did forts provide to the Maratha state?', options: ['Defense and administration', 'Only decoration', 'Only markets'], answer: 'Defense and administration' },
  { level: 'Warrior', question: 'Which group of local fighters supported early campaigns?', options: ['Mavalas', 'Janissaries', 'Samurai'], answer: 'Mavalas' },
  { level: 'Warrior', question: 'Which opponent was defeated at Pratapgad?', options: ['Afzal Khan', 'Robert Clive', 'Ibrahim Lodi'], answer: 'Afzal Khan' },
  { level: 'Warrior', question: 'Which value was central to Shivaji Maharaj\'s rule?', options: ['Justice for subjects', 'Religious persecution', 'Random plunder'], answer: 'Justice for subjects' },
  { level: 'Warrior', question: 'Which administrative council is associated with Shivaji Maharaj?', options: ['Ashtapradhan Mandal', 'Navaratna Sabha', 'Privy Council'], answer: 'Ashtapradhan Mandal' },
  { level: 'Warrior', question: 'Which region was vital for sea forts and ports?', options: ['Konkan', 'Bundelkhand', 'Punjab plains'], answer: 'Konkan' },
  { level: 'Historian', question: 'In which year was Shivaji Maharaj crowned at Raigad?', options: ['1674', '1659', '1680'], answer: '1674' },
  { level: 'Historian', question: 'In which year did Shivaji Maharaj pass away?', options: ['1680', '1707', '1670'], answer: '1680' },
  { level: 'Historian', question: 'Which date is commonly accepted for Shivaji Maharaj\'s birth?', options: ['19 February 1630', '6 June 1674', '3 April 1680'], answer: '19 February 1630' },
  { level: 'Historian', question: 'Which fort was associated with the coronation ceremony?', options: ['Raigad', 'Shivneri', 'Torna'], answer: 'Raigad' },
  { level: 'Historian', question: 'Which treaty forced a temporary surrender of several forts?', options: ['Treaty of Purandar', 'Treaty of Salbai', 'Treaty of Bassein'], answer: 'Treaty of Purandar' },
  { level: 'Historian', question: 'Which battle followed Afzal Khan\'s campaign?', options: ['Pratapgad', 'Haldighati', 'Buxar'], answer: 'Pratapgad' },
  { level: 'Historian', question: 'Which office in Ashtapradhan handled justice?', options: ['Nyayadhish', 'Senapati', 'Peshwa only'], answer: 'Nyayadhish' },
  { level: 'Historian', question: 'Which office was connected with military command?', options: ['Senapati', 'Panditrao', 'Sachiv'], answer: 'Senapati' },
  { level: 'Historian', question: 'Which language/culture did Shivaji Maharaj promote in administration?', options: ['Marathi and Sanskrit', 'Latin and Greek', 'Chinese and Persian only'], answer: 'Marathi and Sanskrit' },
  { level: 'Historian', question: 'What was the strategic value of sea forts?', options: ['Coastal defense and naval control', 'Mountain farming', 'Desert caravan shelter'], answer: 'Coastal defense and naval control' },
  { level: 'Historian', question: 'Who was Shivaji Maharaj\'s father?', options: ['Shahaji Maharaj', 'Sambhaji Maharaj', 'Tanaji Malusare'], answer: 'Shahaji Maharaj' },
  { level: 'Historian', question: 'Who succeeded Shivaji Maharaj?', options: ['Sambhaji Maharaj', 'Shahu Maharaj immediately', 'Baji Prabhu'], answer: 'Sambhaji Maharaj' },
  { level: 'Historian', question: 'Which fort is linked with the title "first conquest"?', options: ['Torna', 'Raigad', 'Vijaydurg'], answer: 'Torna' },
  { level: 'Historian', question: 'Which fort was a naval headquarters in the site gallery?', options: ['Vijaydurg', 'Shivneri', 'Rajgad'], answer: 'Vijaydurg' },
  { level: 'Historian', question: 'Which battle involved Baji Prabhu holding a narrow pass?', options: ['Pavan Khind', 'Salher', 'Kolhapur'], answer: 'Pavan Khind' },
  { level: 'Historian', question: 'Which battle was fought against a large Mughal force near Nashik?', options: ['Salher', 'Pratapgad', 'Surat'], answer: 'Salher' },
  { level: 'Historian', question: 'What did the raid on Shaista Khan demonstrate?', options: ['Night-raid intelligence', 'Naval blockade', 'Formal court debate'], answer: 'Night-raid intelligence' },
  { level: 'Historian', question: 'Why was Surat important to the Mughals?', options: ['It was a rich port city', 'It was a mountain fort', 'It was a desert outpost'], answer: 'It was a rich port city' },
  { level: 'Historian', question: 'Which fort symbolizes Shivaji Maharaj\'s birth and early destiny?', options: ['Shivneri', 'Sindhudurg', 'Vijaydurg'], answer: 'Shivneri' },
  { level: 'Historian', question: 'What is the strongest theme connecting the site sections?', options: ['Swarajya', 'Foreign empire service', 'Retreat from public life'], answer: 'Swarajya' },
];

const bookChapters = [
  {
    title: 'Ancestors and the Bhonsle Lineage',
    subtitle: 'Roots before the rise',
    body: 'This chapter is reserved for your detailed writing on the ancestors of Chhatrapati Shivaji Maharaj, the Bhonsle family background, Shahaji Maharaj, Jijabai, and the political world of the Deccan before his birth.',
  },
  {
    title: 'Birth at Shivneri',
    subtitle: '19 February 1630',
    body: 'Shivaji Maharaj was born at Shivneri Fort. This chapter can include Jijabai\'s influence, the atmosphere of conflict in the Deccan, and the early values that shaped his mind.',
  },
  {
    title: 'Childhood and Education',
    subtitle: 'The making of a leader',
    body: 'Use this chapter for his upbringing in Pune, training, companions, spiritual influences, and the first signs of courage, discipline and administrative ability.',
  },
  {
    title: 'Oath of Swarajya',
    subtitle: 'The dream becomes a mission',
    body: 'This chapter can explain the idea of Swarajya, the capture of early forts, the role of the Mavalas, and how a young leader began building a state.',
  },
  {
    title: 'Battles and Strategy',
    subtitle: 'Ganimi Kava and battlefield intelligence',
    body: 'Add full details of Pratapgad, Pavan Khind, Shaista Khan, Surat, Salher and other campaigns. This section is ideal for maps, battle summaries and leadership lessons.',
  },
  {
    title: 'Administration and Navy',
    subtitle: 'The ruler beyond the sword',
    body: 'This chapter can cover forts, revenue systems, Ashtapradhan Mandal, justice, religious policy, treatment of civilians, and the creation of a strong navy.',
  },
  {
    title: 'Coronation at Raigad',
    subtitle: 'The sovereign Chhatrapati',
    body: 'Use this chapter for the 1674 coronation, symbols of sovereignty, Raigad as capital, and the formal rise of the Maratha state.',
  },
  {
    title: 'Final Years and Death',
    subtitle: 'A life completed, a legacy begun',
    body: 'This chapter can describe the final years, death at Raigad in 1680, succession, and the way his work continued after him.',
  },
  {
    title: 'Legacy for Today',
    subtitle: 'Why fans still remember him',
    body: 'Close your book with lessons for modern readers: courage, governance, respect, strategy, self-rule, cultural pride and public duty.',
  },
];

const bookDetails = {
  title: 'My Book on Chhatrapati Shivaji Maharaj',
  author: 'Sneha Hudge',
  description: 'Read the online chapter version, download the complete manuscript, and share feedback about any chapter, correction, idea or emotion the book brings up.',
  coverImage: 'assets/birth.png',
  downloadUrl: 'books/chhatrapati-shivaji-maharaj-book.txt',
  fileLabel: 'Complete Book',
};

const feedbackTypes = ['General feedback', 'Correction', 'Chapter suggestion', 'Appreciation', 'Publishing idea'];

const posterDownloads = [
  {
    title: 'Daily Quote Poster',
    type: 'Quote',
    image: 'assets/birth.png',
    download: 'assets/birth.png',
  },
  {
    title: 'Raigad Wallpaper',
    type: 'Fort Wallpaper',
    image: 'assets/Raigad.png',
    download: 'assets/Raigad.png',
  },
  {
    title: 'Pratapgad Battle Poster',
    type: 'Battle Poster',
    image: 'assets/Pratapgad.png',
    download: 'assets/Pratapgad.png',
  },
  {
    title: 'Swarajya Festival Poster',
    type: 'Festival',
    image: 'assets/Screenshot 2026-05-09 181119.png',
    download: 'assets/Screenshot 2026-05-09 181119.png',
  },
];

const quizLevels = ['Beginner', 'Warrior', 'Historian'];

const festivalWishes = [
  'Wishing you a proud and inspiring Shiv Jayanti. May the spirit of Swarajya guide every step.',
  'Jay Bhavani, Jay Shivaji! Let courage, justice and duty shine in every home.',
  'On Shiv Jayanti, may Chhatrapati Shivaji Maharaj\'s ideals awaken strength, wisdom and unity.',
  'Celebrate the birth of the great Chhatrapati with pride, discipline and devotion to Swarajya.',
];

const festivalSlogans = [
  'Jay Bhavani Jay Shivaji',
  'Swarajya is self-respect in action',
  'Remember the courage, live the values',
  'Fort by fort, heart by heart, Swarajya lives',
  'Chhatrapati Shivaji Maharaj ki Jay',
];

const festivalCards = [
  {
    title: 'Shiv Jayanti Status',
    size: 'Instagram / WhatsApp Story',
    width: 1080,
    height: 1920,
    message: 'Jay Bhavani Jay Shivaji',
    caption: 'Shiv Jayanti wishes to all. May the spirit of Swarajya inspire courage and duty.',
    image: 'assets/birth.png',
  },
  {
    title: 'Festival Greeting',
    size: 'Square Greeting',
    width: 1080,
    height: 1080,
    message: 'Happy Shiv Jayanti',
    caption: 'Remembering Chhatrapati Shivaji Maharaj: courage, justice and Swarajya.',
    image: 'assets/Raigad.png',
  },
  {
    title: 'Swarajya Wallpaper',
    size: 'Mobile Wallpaper',
    width: 1080,
    height: 1920,
    message: 'Swarajya Lives Forever',
    caption: 'A tribute to Chhatrapati Shivaji Maharaj and the eternal flame of Swarajya.',
    image: 'assets/Screenshot 2026-05-05 235829.png',
  },
];

function getNextShivJayanti() {
  const now = new Date();
  const currentYearDate = new Date(now.getFullYear(), 1, 19, 0, 0, 0);
  return now <= currentYearDate ? currentYearDate : new Date(now.getFullYear() + 1, 1, 19, 0, 0, 0);
}

function getCountdownParts(targetDate) {
  const distance = Math.max(0, targetDate.getTime() - Date.now());
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

function buildFestivalSvg(card) {
  const escapedMessage = card.message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escapedCaption = card.caption.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${card.width}" height="${card.height}" viewBox="0 0 ${card.width} ${card.height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0D0500"/>
      <stop offset="0.48" stop-color="#5A1500"/>
      <stop offset="1" stop-color="#FF6B00"/>
    </linearGradient>
    <radialGradient id="sun" cx="50%" cy="34%" r="44%">
      <stop offset="0" stop-color="#FFD766" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#FF6B00" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#sun)"/>
  <path d="M0 ${card.height * 0.78} C ${card.width * 0.28} ${card.height * 0.7}, ${card.width * 0.48} ${card.height * 0.88}, ${card.width} ${card.height * 0.74} L ${card.width} ${card.height} L 0 ${card.height} Z" fill="#120700" opacity="0.72"/>
  <rect x="${card.width * 0.08}" y="${card.height * 0.08}" width="${card.width * 0.84}" height="${card.height * 0.84}" fill="none" stroke="#D4A017" stroke-width="6"/>
  <text x="50%" y="${card.height * 0.18}" text-anchor="middle" fill="#F5C842" font-family="Georgia, serif" font-size="${card.width * 0.045}" letter-spacing="6">SHIV JAYANTI</text>
  <text x="50%" y="${card.height * 0.43}" text-anchor="middle" fill="#FFF5E0" font-family="Georgia, serif" font-size="${card.width * 0.082}" font-weight="700">${escapedMessage}</text>
  <foreignObject x="${card.width * 0.14}" y="${card.height * 0.51}" width="${card.width * 0.72}" height="${card.height * 0.22}">
    <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Georgia, serif; color: #F5E6C8; font-size: ${card.width * 0.037}px; line-height: 1.45; text-align: center;">${escapedCaption}</div>
  </foreignObject>
  <text x="50%" y="${card.height * 0.87}" text-anchor="middle" fill="#F5C842" font-family="Georgia, serif" font-size="${card.width * 0.038}" letter-spacing="4">CHHATRAPATI SHIVAJI MAHARAJ</text>
</svg>`;
}

function downloadFestivalCard(card) {
  const blob = new Blob([buildFestivalSvg(card)], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${card.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.svg`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function FanExperience() {
  const [selectedFort, setSelectedFort] = useState(forts[0]);
  const [quizLevel, setQuizLevel] = useState('Beginner');
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [activeChapter, setActiveChapter] = useState(0);
  const [bookSearch, setBookSearch] = useState('');
  const [fontScale, setFontScale] = useState(1);
  const [bookmarkedChapter, setBookmarkedChapter] = useState(() => Number(localStorage.getItem('shivaji-bookmark') || 0));
  const [bookFeedback, setBookFeedback] = useState([]);
  const [bookFeedbackStatus, setBookFeedbackStatus] = useState('');
  const [bookFeedbackForm, setBookFeedbackForm] = useState({
    name: '',
    email: '',
    feedbackType: feedbackTypes[0],
    chapter: bookChapters[0].title,
    rating: '5',
    message: '',
  });
  const [countdown, setCountdown] = useState(() => getCountdownParts(getNextShivJayanti()));
  const [copiedText, setCopiedText] = useState('');

  const todayQuote = useMemo(() => {
    const dayNumber = Math.floor(Date.now() / 86400000);
    return quotes[dayNumber % quotes.length];
  }, []);

  const levelQuestions = useMemo(
    () => quizQuestions.filter((item) => item.level === quizLevel),
    [quizLevel],
  );

  const visibleChapters = useMemo(() => {
    const search = bookSearch.trim().toLowerCase();
    if (!search) return bookChapters.map((chapter, index) => ({ ...chapter, originalIndex: index }));
    return bookChapters
      .map((chapter, index) => ({ ...chapter, originalIndex: index }))
      .filter((chapter) => `${chapter.title} ${chapter.subtitle} ${chapter.body}`.toLowerCase().includes(search));
  }, [bookSearch]);

  const readingProgress = Math.round(((activeChapter + 1) / bookChapters.length) * 100);

  useEffect(() => {
    localStorage.setItem('shivaji-bookmark', String(bookmarkedChapter));
  }, [bookmarkedChapter]);

  useEffect(() => {
    fetch('/api/book-feedback')
      .then((response) => response.json())
      .then(setBookFeedback)
      .catch(() => setBookFeedbackStatus('Book feedback API is unavailable.'));
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts(getNextShivJayanti()));
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  function chooseAnswer(option) {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === levelQuestions[activeQuestion].answer) {
      setScore((current) => current + 1);
    }
  }

  function nextQuestion() {
    setSelectedAnswer('');
    setActiveQuestion((current) => (current + 1) % levelQuestions.length);
  }

  function resetQuiz() {
    setActiveQuestion(0);
    setScore(0);
    setSelectedAnswer('');
  }

  function changeLevel(level) {
    setQuizLevel(level);
    setActiveQuestion(0);
    setScore(0);
    setSelectedAnswer('');
  }

  function showPreviousChapter() {
    setActiveChapter((current) => Math.max(0, current - 1));
  }

  function showNextChapter() {
    setActiveChapter((current) => Math.min(bookChapters.length - 1, current + 1));
  }

  async function copyFestivalText(text) {
    await navigator.clipboard.writeText(text);
    setCopiedText(text);
    window.setTimeout(() => setCopiedText(''), 1600);
  }

  function updateBookFeedbackField(event) {
    setBookFeedbackForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submitBookFeedback(event) {
    event.preventDefault();
    setBookFeedbackStatus('Saving feedback...');

    const response = await fetch('/api/book-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookFeedbackForm),
    });

    if (!response.ok) {
      const error = await response.json();
      setBookFeedbackStatus(error.error || 'Could not save feedback.');
      return;
    }

    const savedFeedback = await response.json();
    setBookFeedback((current) => [savedFeedback, ...current].slice(0, 20));
    setBookFeedbackForm({
      name: '',
      email: '',
      feedbackType: feedbackTypes[0],
      chapter: bookChapters[activeChapter].title,
      rating: '5',
      message: '',
    });
    setBookFeedbackStatus('Thank you. Your book feedback was received.');
  }

  const question = levelQuestions[activeQuestion];
  const chapter = bookChapters[activeChapter];

  return (
    <section id="fan-experience" className="fan-experience">
      <div className="section-container">
        <div className="section-header reveal visible">
          <span className="section-label">Fan Tools</span>
          <h2 className="section-title">Explore, Learn & Read</h2>
          <div className="section-divider"></div>
          <p className="section-desc">
            Interactive features for devotees, students and history lovers of Chhatrapati Shivaji Maharaj.
          </p>
        </div>

        <div className="fan-tools-grid">
          <article className="fan-panel daily-quote">
            <span className="tool-kicker">Today&apos;s Inspiration</span>
            <p className="quote-text">&quot;{todayQuote.text}&quot;</p>
            <p className="quote-note">{todayQuote.note}</p>
          </article>

          <article className="fan-panel quiz-panel">
            <div className="tool-heading">
              <span className="tool-kicker">Knowledge Quiz</span>
              <strong>{score}/{levelQuestions.length}</strong>
            </div>
            <div className="level-tabs" aria-label="Quiz level">
              {quizLevels.map((level) => (
                <button
                  key={level}
                  className={quizLevel === level ? 'active' : ''}
                  type="button"
                  onClick={() => changeLevel(level)}
                >
                  {level}
                </button>
              ))}
            </div>
            <h3>{question.question}</h3>
            <div className="quiz-options">
              {question.options.map((option) => {
                const isCorrect = selectedAnswer && option === question.answer;
                const isWrong = selectedAnswer === option && option !== question.answer;
                return (
                  <button
                    className={`${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                    key={option}
                    type="button"
                    onClick={() => chooseAnswer(option)}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <div className="quiz-actions">
              <button type="button" onClick={nextQuestion}>Next</button>
              <button type="button" onClick={resetQuiz}>Reset</button>
            </div>
          </article>
        </div>

        <div className="fort-explorer">
          <div className="section-header compact-header">
            <span className="section-label">Interactive</span>
            <h2 className="section-title">Fort Explorer</h2>
            <div className="section-divider"></div>
          </div>
          <div className="maharashtra-map" aria-label="Interactive Maharashtra fort map">
            <div className="map-shape">
              <span className="map-label">Maharashtra Fort Trail</span>
              {forts.map((fort) => (
                <button
                  key={fort.name}
                  className={fort.name === selectedFort.name ? 'map-pin active' : 'map-pin'}
                  style={{ left: `${fort.mapX}%`, top: `${fort.mapY}%` }}
                  type="button"
                  onClick={() => setSelectedFort(fort)}
                  title={fort.name}
                  aria-label={fort.name}
                >
                  <span>{fort.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="fort-explorer-layout">
            <div className="fort-list" role="tablist" aria-label="Select a fort">
              {forts.map((fort) => (
                <button
                  key={fort.name}
                  className={fort.name === selectedFort.name ? 'active' : ''}
                  type="button"
                  onClick={() => setSelectedFort(fort)}
                >
                  <span>{fort.name}</span>
                  <small>{fort.region}</small>
                </button>
              ))}
            </div>
            <article className="fort-detail">
              <img src={selectedFort.image} alt={selectedFort.name} />
              <div>
                <span className="tool-kicker">{selectedFort.region}</span>
                <h3>{selectedFort.name}</h3>
                <p>{selectedFort.importance}</p>
                <div className="fort-visit-box">
                  <strong>Best time to visit</strong>
                  <span>{selectedFort.bestTime}</span>
                  <p>{selectedFort.travelTip}</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div id="fort-visit-guide" className="fort-visit-guide">
          <div className="section-header compact-header">
            <span className="section-label">Travel Guide</span>
            <h2 className="section-title">Best Time & Special Places</h2>
            <div className="section-divider"></div>
            <p className="section-desc">
              Plan each fort visit with the right season, useful travel note and the most special places to see there.
            </p>
          </div>
          <div className="fort-visit-grid">
            {forts.map((fort) => (
              <article className="fort-visit-card" key={fort.name}>
                <img src={fort.image} alt={fort.name} />
                <div className="fort-visit-content">
                  <span className="tool-kicker">{fort.region}</span>
                  <h3>{fort.name}</h3>
                  <div className="visit-time-box">
                    <strong>Best time to visit</strong>
                    <span>{fort.bestTime}</span>
                  </div>
                  <div className="route-difficulty-grid">
                    <div>
                      <strong>How to reach</strong>
                      <span>{fort.howToReach}</span>
                    </div>
                    <div>
                      <strong>Trek difficulty</strong>
                      <span>{fort.trekDifficulty}</span>
                    </div>
                  </div>
                  <p>{fort.travelTip}</p>
                  <h4>What is special to visit</h4>
                  <ul>
                    {fort.specialVisits.map((place) => (
                      <li key={place}>{place}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="download-hub">
          <div className="section-header compact-header">
            <span className="section-label">Downloads</span>
            <h2 className="section-title">Posters & Wallpapers</h2>
            <div className="section-divider"></div>
          </div>
          <div className="poster-grid">
            {posterDownloads.map((poster) => (
              <article className="poster-card" key={poster.title}>
                <img src={poster.image} alt={poster.title} />
                <div>
                  <span>{poster.type}</span>
                  <h3>{poster.title}</h3>
                  <a href={poster.download} download>
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="festival-mode" className="festival-mode">
          <div className="section-header compact-header">
            <span className="section-label">Shiv Jayanti</span>
            <h2 className="section-title">Festival Mode</h2>
            <div className="section-divider"></div>
            <p className="section-desc">
              Countdown, wishes, slogans, status images and greeting cards for Shiv Jayanti.
            </p>
          </div>

          <div className="festival-layout">
            <article className="festival-countdown">
              <span className="tool-kicker">Countdown to 19 February</span>
              <div className="countdown-grid">
                <div><strong>{countdown.days}</strong><span>Days</span></div>
                <div><strong>{countdown.hours}</strong><span>Hours</span></div>
                <div><strong>{countdown.minutes}</strong><span>Minutes</span></div>
                <div><strong>{countdown.seconds}</strong><span>Seconds</span></div>
              </div>
              <p>Prepare wishes, posters and greetings before Shiv Jayanti arrives.</p>
            </article>

            <article className="festival-copy-panel">
              <span className="tool-kicker">Wishes & Slogans</span>
              <div className="festival-copy-list">
                {[...festivalWishes, ...festivalSlogans].map((text) => (
                  <button key={text} type="button" onClick={() => copyFestivalText(text)}>
                    {text}
                    {copiedText === text && <span>Copied</span>}
                  </button>
                ))}
              </div>
            </article>
          </div>

          <div className="festival-card-grid">
            {festivalCards.map((card) => (
              <article className="festival-card" key={card.title}>
                <div className="festival-card-preview" style={{ backgroundImage: `linear-gradient(180deg, rgba(13,5,0,0.08), rgba(13,5,0,0.86)), url("${card.image}")` }}>
                  <span>Shiv Jayanti</span>
                  <strong>{card.message}</strong>
                  <p>{card.caption}</p>
                </div>
                <div className="festival-card-actions">
                  <div>
                    <h3>{card.title}</h3>
                    <p>{card.size}</p>
                  </div>
                  <button type="button" onClick={() => downloadFestivalCard(card)}>
                    Download
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div id="book" className="book-reader">
          <div className="section-header compact-header">
            <span className="section-label">Your Book</span>
            <h2 className="section-title">{bookDetails.title}</h2>
            <div className="section-divider"></div>
            <p className="section-desc">
              {bookDetails.description}
            </p>
          </div>
          <div className="book-download-panel">
            <img src={bookDetails.coverImage} alt={`${bookDetails.title} cover`} />
            <div>
              <span className="tool-kicker">By {bookDetails.author}</span>
              <h3>{bookDetails.fileLabel}</h3>
              <p>Visitors can keep a copy for offline reading, then return here to send chapter-wise feedback.</p>
            </div>
            <a href={bookDetails.downloadUrl} download>
              Download Book
            </a>
          </div>
          <div className="book-toolbar">
            <label>
              Search chapters
              <input
                value={bookSearch}
                type="search"
                placeholder="Search birth, battles, legacy..."
                onChange={(event) => setBookSearch(event.target.value)}
              />
            </label>
            <label>
              Font size
              <input
                min="0.9"
                max="1.3"
                step="0.1"
                type="range"
                value={fontScale}
                onChange={(event) => setFontScale(Number(event.target.value))}
              />
            </label>
            <button type="button" onClick={() => setBookmarkedChapter(activeChapter)}>
              Bookmark Chapter {activeChapter + 1}
            </button>
            <button type="button" onClick={() => setActiveChapter(bookmarkedChapter)}>
              Go to Bookmark
            </button>
          </div>
          <div className="reading-progress" aria-label={`Reading progress ${readingProgress}%`}>
            <span style={{ width: `${readingProgress}%` }}></span>
          </div>
          <div className="book-layout">
            <div className="chapter-tabs" role="tablist" aria-label="Book chapters">
              {visibleChapters.map((item) => (
                <button
                  key={item.title}
                  className={activeChapter === item.originalIndex ? 'active' : ''}
                  type="button"
                  onClick={() => setActiveChapter(item.originalIndex)}
                >
                  Chapter {item.originalIndex + 1}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
            <article className="chapter-page" style={{ fontSize: `${fontScale}rem` }}>
              <span className="tool-kicker">{chapter.subtitle}</span>
              <h3>{chapter.title}</h3>
              <p>{chapter.body}</p>
              <div className="chapter-controls">
                <button type="button" onClick={showPreviousChapter} disabled={activeChapter === 0}>
                  Previous Chapter
                </button>
                <span>{readingProgress}% read</span>
                <button type="button" onClick={showNextChapter} disabled={activeChapter === bookChapters.length - 1}>
                  Next Chapter
                </button>
              </div>
              <div className="chapter-note">
                This reader is ready for your final manuscript text, with progress, search, bookmark and chapter navigation already built in.
              </div>
            </article>
          </div>
          <div className="book-feedback-section">
            <form className="book-feedback-form" onSubmit={submitBookFeedback}>
              <div>
                <span className="tool-kicker">Reader Feedback</span>
                <h3>Share feedback about the book</h3>
              </div>
              <div className="book-feedback-fields">
                <input name="name" value={bookFeedbackForm.name} onChange={updateBookFeedbackField} maxLength="60" placeholder="Your name" required />
                <input name="email" value={bookFeedbackForm.email} onChange={updateBookFeedbackField} maxLength="90" type="email" placeholder="Email (optional)" />
                <select name="feedbackType" value={bookFeedbackForm.feedbackType} onChange={updateBookFeedbackField}>
                  {feedbackTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <select name="chapter" value={bookFeedbackForm.chapter} onChange={updateBookFeedbackField}>
                  {bookChapters.map((item, index) => (
                    <option key={item.title} value={item.title}>Chapter {index + 1}: {item.title}</option>
                  ))}
                </select>
                <label>
                  Rating
                  <input name="rating" value={bookFeedbackForm.rating} onChange={updateBookFeedbackField} min="1" max="5" type="number" />
                </label>
                <textarea name="message" value={bookFeedbackForm.message} onChange={updateBookFeedbackField} maxLength="700" placeholder="Write feedback, correction, chapter idea or publishing suggestion" required />
              </div>
              <button type="submit">Send Feedback</button>
              <p>{bookFeedbackStatus}</p>
            </form>

            <div className="book-feedback-list">
              {bookFeedback.slice(0, 4).map((entry) => (
                <article className="book-feedback-card" key={entry.id}>
                  <div>
                    <strong>{entry.name}</strong>
                    <span>{entry.feedbackType} - {entry.rating}/5</span>
                  </div>
                  <small>{entry.chapter}</small>
                  <p>{entry.message}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TributeWall() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ name: '', city: '', state: '', message: '' });

  async function loadEntries() {
    const response = await fetch('/api/guestbook');
    const data = await response.json();
    setEntries(data);
  }

  useEffect(() => {
    loadEntries().catch(() => setStatus('Tribute wall API is unavailable.'));
  }, []);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function submitTribute(event) {
    event.preventDefault();
    setStatus('Saving tribute...');

    const response = await fetch('/api/guestbook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const error = await response.json();
      setStatus(error.error || 'Could not save tribute.');
      return;
    }

    setForm({ name: '', city: '', state: '', message: '' });
    setStatus('Tribute posted.');
    await loadEntries();
  }

  async function likeTribute(id) {
    const response = await fetch(`/api/guestbook/${id}/like`, { method: 'POST' });
    if (response.ok) {
      await loadEntries();
    }
  }

  return (
    <section id="guestbook" className="tribute-wall">
      <div className="section-container">
        <div className="section-header reveal visible">
          <span className="section-label">Fan Community</span>
          <h2 className="section-title">Tribute Wall</h2>
          <div className="section-divider"></div>
          <p className="section-desc">Fans can leave a tribute with city/state and support other messages with likes.</p>
        </div>

        <div className="tribute-layout">
          <form className="tribute-form" onSubmit={submitTribute}>
            <h3>Leave a Tribute</h3>
            <input name="name" value={form.name} onChange={updateField} maxLength="60" placeholder="Your name" required />
            <div className="tribute-location-fields">
              <input name="city" value={form.city} onChange={updateField} maxLength="50" placeholder="City" />
              <input name="state" value={form.state} onChange={updateField} maxLength="50" placeholder="State" />
            </div>
            <textarea name="message" value={form.message} onChange={updateField} maxLength="240" placeholder="Your tribute message" required />
            <button type="submit">Post Tribute</button>
            <p>{status}</p>
          </form>

          <div className="tribute-list">
            {entries.map((entry) => (
              <article className="tribute-card" key={entry.id}>
                <div className="tribute-card-head">
                  <div>
                    <strong>{entry.name}</strong>
                    {(entry.city || entry.state) && <span>{[entry.city, entry.state].filter(Boolean).join(', ')}</span>}
                  </div>
                  <time dateTime={entry.createdAt}>
                    {new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(entry.createdAt))}
                  </time>
                </div>
                <p>{entry.message}</p>
                <button type="button" onClick={() => likeTribute(entry.id)}>
                  Like {Number(entry.likes || 0)}
                </button>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminFeedbackView() {
  const [bookMessages, setBookMessages] = useState([]);
  const [visitorMessages, setVisitorMessages] = useState([]);
  const [status, setStatus] = useState('Loading messages...');

  async function loadAdminMessages() {
    const [bookResponse, visitorResponse] = await Promise.all([
      fetch('/api/book-feedback'),
      fetch('/api/guestbook'),
    ]);

    if (!bookResponse.ok || !visitorResponse.ok) {
      throw new Error('Could not load feedback.');
    }

    const [bookData, visitorData] = await Promise.all([
      bookResponse.json(),
      visitorResponse.json(),
    ]);

    setBookMessages(bookData);
    setVisitorMessages(visitorData);
    setStatus('');
  }

  useEffect(() => {
    loadAdminMessages().catch(() => setStatus('Admin feedback API is unavailable.'));
  }, []);

  function formatDate(value) {
    if (!value) return 'No date';
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  }

  return (
    <section id="admin-feedback" className="admin-feedback">
      <div className="section-container">
        <div className="section-header reveal visible">
          <span className="section-label">Admin View</span>
          <h2 className="section-title">Feedback Dashboard</h2>
          <div className="section-divider"></div>
          <p className="section-desc">
            A neat view of book feedback and visitor tribute messages collected from the site.
          </p>
        </div>

        <div className="admin-summary-grid">
          <article>
            <span>Book feedback</span>
            <strong>{bookMessages.length}</strong>
          </article>
          <article>
            <span>Visitor messages</span>
            <strong>{visitorMessages.length}</strong>
          </article>
          <button type="button" onClick={() => loadAdminMessages().catch(() => setStatus('Could not refresh messages.'))}>
            Refresh
          </button>
        </div>
        {status && <p className="admin-status">{status}</p>}

        <div className="admin-feedback-layout">
          <div className="admin-panel">
            <div className="admin-panel-head">
              <span className="tool-kicker">Book</span>
              <h3>Reader Feedback</h3>
            </div>
            <div className="admin-message-list">
              {bookMessages.length === 0 && <p className="empty-admin-message">No book feedback yet.</p>}
              {bookMessages.map((entry) => (
                <article className="admin-message-card" key={entry.id}>
                  <div className="admin-message-meta">
                    <strong>{entry.name}</strong>
                    <time dateTime={entry.createdAt}>{formatDate(entry.createdAt)}</time>
                  </div>
                  <div className="admin-tags">
                    <span>{entry.feedbackType}</span>
                    <span>{entry.rating}/5</span>
                    {entry.chapter && <span>{entry.chapter}</span>}
                  </div>
                  {entry.email && <small>{entry.email}</small>}
                  <p>{entry.message}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="admin-panel">
            <div className="admin-panel-head">
              <span className="tool-kicker">Community</span>
              <h3>Visitor Tribute Messages</h3>
            </div>
            <div className="admin-message-list">
              {visitorMessages.length === 0 && <p className="empty-admin-message">No visitor messages yet.</p>}
              {visitorMessages.map((entry) => (
                <article className="admin-message-card" key={entry.id}>
                  <div className="admin-message-meta">
                    <strong>{entry.name}</strong>
                    <time dateTime={entry.createdAt}>{formatDate(entry.createdAt)}</time>
                  </div>
                  {(entry.city || entry.state) && <small>{[entry.city, entry.state].filter(Boolean).join(', ')}</small>}
                  <p>{entry.message}</p>
                  <div className="admin-tags">
                    <span>{Number(entry.likes || 0)} likes</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    runLegacyInteractions();
  }, []);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: beforeGuestbook }} />
      <FanExperience />
      <TributeWall />
      <AdminFeedbackView />
      <div dangerouslySetInnerHTML={{ __html: `<!-- FOOTER -->${footerMarkup}` }} />
    </>
  );
}
