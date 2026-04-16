// English UI copy for Fidel Friends
// Easy to swap or add translations later

export const en = {
  // App name and tagline
  appName: 'Fidel Friends',
  tagline: 'Learn Amharic letters step by step',
  
  // Landing page
  landing: {
    heroTitle: 'A fun way for kids to learn Amharic letters every day',
    startLearning: 'Start Learning',
    tryDemo: 'Try Demo',
    features: {
      learnLetters: 'Learn letters',
      practiceDaily: 'Practice daily',
      earnStars: 'Earn stars',
    },
    whyTitle: 'Why Fidel Friends?',
    whyPoints: [
      'Learn one letter at a time',
      'Daily review builds memory',
      'Perfect for families and weekend schools',
      'Friendly practice for beginners',
    ],
  },
  
  // Onboarding
  onboarding: {
    welcome: 'Welcome to Fidel Friends!',
    chooseName: "What's your name?",
    chooseAge: 'How old are you?',
    ageRange4_6: '4-6 years',
    ageRange7_8: '7-8 years',
    ageRange9_10: '9-10 years',
    chooseGoal: 'How long do you want to practice each day?',
    goal5min: '5 minutes',
    goal10min: '10 minutes',
    goal15min: '15 minutes',
    chooseLanguage: 'Which language should we use?',
    langEnglishFirst: 'English + Amharic',
    langAmharicFirst: 'Mostly Amharic',
    finish: "Let's Start!",
    welcomeCard: {
      title: 'Ready to learn Amharic?',
      subtitle: 'You will learn letters, play games, and earn stars!',
      startUnit1: 'Start Unit 1',
    },
  },
  
  // Home dashboard
  home: {
    greeting: 'Hello',
    streak: 'Streak',
    days: 'days',
    xp: 'XP',
    todayGoal: "Today's Goal",
    continueLesson: 'Continue Lesson',
    dailyReview: 'Daily Review',
    weeklyProgress: 'Weekly Progress',
    recentLetters: 'Recently Learned',
    rewards: 'Rewards',
    motivation: [
      "Great job!",
      "You're doing amazing!",
      "Keep it up!",
      "Super star!",
      "Wonderful work!",
    ],
  },
  
  // Lesson path
  lessonPath: {
    unit: 'Unit',
    locked: 'Locked',
    completed: 'Completed',
    stars: 'stars',
    startLesson: 'Start',
    continueLesson: 'Continue',
    replayLesson: 'Replay',
  },
  
  // Lesson player
  lesson: {
    next: 'Next',
    back: 'Back',
    check: 'Check',
    tryAgain: 'Try Again',
    correct: 'Correct!',
    incorrect: 'Not quite, try again!',
    greatJob: 'Great job!',
    awesomeTracing: 'Awesome tracing!',
    tapLetter: 'Tap the letter',
    findInWord: 'Find this letter in the words',
    matchPicture: 'Match the letter to the picture',
    traceLetter: 'Trace the letter',
    listenRepeat: 'Listen and repeat',
    progress: 'Progress',
    exitLesson: 'Exit Lesson',
    exitConfirm: 'Are you sure you want to exit? Your progress will be saved.',
  },
  
  // Daily review
  review: {
    title: 'Daily Review',
    subtitle: 'Practice letters you have learned',
    startReview: 'Start Review',
    questions: 'Questions',
    score: 'Score',
    comeBackTomorrow: 'Come back tomorrow for more practice!',
    perfectScore: 'Perfect score! Amazing!',
    goodJob: 'Good job! Keep practicing!',
  },
  
  // Tracing
  tracing: {
    title: 'Writing Practice',
    practiceMode: 'Practice Mode',
    freeDrawMode: 'Free Draw',
    reset: 'Reset',
    next: 'Next Letter',
    guide: 'Trace over the faded letter',
    done: "I'm Done!",
  },
  
  // Rewards
  rewards: {
    title: 'Your Rewards',
    totalXP: 'Total XP',
    totalStars: 'Total Stars',
    lessonsCompleted: 'Lessons Completed',
    lettersLearned: 'Letters Learned',
    badges: 'Badges',
    badgeFirstLesson: 'First Lesson',
    badgeThreeDayStreak: '3 Day Streak',
    badgeLetterFinder: 'Letter Finder',
    badgeTracingStar: 'Tracing Star',
  },
  
  // Parent page
  parent: {
    title: 'Parent Summary',
    childName: 'Child Name',
    currentUnit: 'Current Unit',
    lettersLearned: 'Letters Learned',
    needsReview: 'Needs Review',
    lessonsCompleted: 'Lessons Completed',
    reviewSessions: 'Review Sessions',
    lastActive: 'Last Active',
    printPractice: 'Print Practice List',
  },
  
  // Settings
  settings: {
    title: 'Settings',
    learnerName: 'Learner Name',
    soundOnOff: 'Sound',
    musicOnOff: 'Music',
    resetProgress: 'Reset Progress',
    resetConfirm: 'Are you sure? This will delete all progress!',
    languageMode: 'Language Mode',
    theme: 'Theme',
    exportProgress: 'Export Progress',
    about: 'About',
    version: 'Version 1.0.0',
  },
  
  // Navigation
  nav: {
    home: 'Home',
    learn: 'Learn',
    review: 'Review',
    rewards: 'Rewards',
    parent: 'Parent',
  },
  
  // Common
  common: {
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    close: 'Close',
    yes: 'Yes',
    no: 'No',
  },
  
  // Messages
  messages: {
    lessonComplete: 'Lesson Complete!',
    earnedXP: 'You earned',
    earnedStars: 'stars',
    newBadge: 'New Badge Unlocked!',
    dayStreak: 'day streak!',
    practiceReminder: "Don't forget to practice today!",
  },
};

export type EnType = typeof en;
