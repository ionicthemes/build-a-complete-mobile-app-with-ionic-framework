## Learn
### learn/
```
ionic generate module learn/categories/learn-categories --flat=true --routing=true

ionic generate component learn/categories/categories-listing-page --module=/src/app/learn/categories/learn-categories.module.ts
```

### learn/:category
```
ionic generate module learn/category/learn-category --flat=true --routing=true

ionic generate component learn/category/category-details-page --module=/src/app/learn/category/learn-category.module.ts
```


## Utils
```
ionic generate module utils/utils --flat=true
```

## Questions
### questions/:slug
```
ionic generate module questions/questions --flat=true --routing=true
ionic generate module questions/questions-shared --flat=true

ionic generate component questions/question-details-page --module=/src/app/questions/questions.module.ts
```

#### app service AppService
```
ionic generate service app
```

#### questions/answer
```
ionic generate component questions/answer-question-modal --module=/src/app/questions/questions.module.ts
```

#### questions/ask
```
ionic generate component questions/ask-question-modal --module=/src/app/questions/questions-shared.module.ts --export=true
```
