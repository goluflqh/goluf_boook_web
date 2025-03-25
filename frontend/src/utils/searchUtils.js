// Define synonymMap at the top of the file
const synonymMap = {
   // Book categories
   'fiction': ['novel', 'story', 'tale', 'adventure', 'fantasy', 'mystery', 'romance'],
   'children': ['kids', 'youth', 'young', 'juvenile', 'toyland', 'fairyland', 'princess'],
   'health': ['wellness', 'fitness', 'nutrition', 'yoga', 'meditation', 'exercise', 'healing'],
   'academic': ['educational', 'study', 'learning', 'science', 'physics', 'mathematics', 'chemistry'],
   'business': ['entrepreneurship', 'marketing', 'finance', 'leadership', 'management', 'corporate'],
   'religious': ['spiritual', 'faith', 'prayer', 'enlightenment', 'wisdom', 'sacred'],

   // Keywords related to price
   'cheap': ['low', 'affordable', 'budget', 'inexpensive'],
   'expensive': ['high', 'premium', 'luxury'],

   // Keywords related to book status/characteristics
   'popular': ['bestseller', 'trending', 'hot', 'favorite'],
   'new': ['latest', 'recent', 'fresh', 'modern'],
   
   // Keywords related to content
   'guide': ['manual', 'handbook', 'tutorial', 'introduction', 'basics'],
   'adventure': ['quest', 'journey', 'exploration', 'discovery'],
   'learning': ['education', 'study', 'training', 'teaching'],
   'strategy': ['technique', 'method', 'approach', 'practice']
};

// Function to calculate relevance score for each search result
const getRelevanceScore = (text, searchTerm, field) => {
   if (!text || !searchTerm) return 0;
   
   text = text.toLowerCase();
   searchTerm = searchTerm.toLowerCase();
   
   // Weights for different fields
   const weights = {
     name: 10,      // Book title is most important
     category: 8,   // Category is second most important
     description: 5 // Description is less important
   };

   let score = 0;
   const searchWords = searchTerm.split(/\s+/).filter(word => word.length >= 2);

   // Exact match with the entire phrase
   if (text.includes(searchTerm)) {
     score += 100 * weights[field];
   }

   // Check individual words
   searchWords.forEach(word => {
     // Exact match with each word
     if (text.includes(word)) {
       score += 50 * weights[field];
     }
     
     // Check synonym matches
     for (const [key, values] of Object.entries(synonymMap)) {
       if ((word === key && values.some(syn => text.includes(syn))) ||
           (values.includes(word) && text.includes(key))) {
         score += 30 * weights[field];
       }
     }
   });

   return score;
};

// Main search function with scoring
export const searchBooks = (books, searchTerm) => {
   if (!searchTerm.trim()) return books; // Return all books if no search term

   const results = books.map(book => {
     // Calculate total score for each book
     const nameScore = getRelevanceScore(book.name, searchTerm, 'name');
     const categoryScore = getRelevanceScore(book.category, searchTerm, 'category');
     const descriptionScore = getRelevanceScore(book.description, searchTerm, 'description');
     
     const totalScore = nameScore + categoryScore + descriptionScore;
     
     return {
       ...book,
       relevanceScore: totalScore
     };
   });

   // Filter results with score > 0 and sort by score
   return results
     .filter(book => book.relevanceScore > 0)
     .sort((a, b) => b.relevanceScore - a.relevanceScore);
};

// Function to generate search suggestions
export const getSearchSuggestions = (books, searchTerm) => {
   if (!searchTerm.trim() || searchTerm.length < 2) return [];
   
   const suggestions = new Set();
   const searchTermLower = searchTerm.toLowerCase();

   // Add suggestions from book titles
   books.forEach(book => {
     if (book.name.toLowerCase().includes(searchTermLower)) {
       suggestions.add(book.name);
     }
   });

   // Add suggestions from categories
   books.forEach(book => {
     if (book.category.toLowerCase().includes(searchTermLower)) {
       suggestions.add(book.category);
     }
   });

   // Add suggestions from common keywords
   const commonSearches = [
     'new arrivals', 'bestsellers', 'popular books',
     'fiction books', 'children books', 'business books',
     'academic books', 'health books', 'religious books'
   ];

   commonSearches.forEach(term => {
     if (term.toLowerCase().includes(searchTermLower)) {
       suggestions.add(term);
     }
   });

   return Array.from(suggestions).slice(0, 5); // Limit to 5 suggestions
};