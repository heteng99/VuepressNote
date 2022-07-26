module.exports = {
  "title": "crocoble",
  "description": "gugugu",
  "dest": "dist",
  "markdown": {
    lineNumbers: true,
    extendMarkdown: md => {
      md.set({
        html: true
      })
      md.use(require('markdown-it-mathjax3'))
    },
  },
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ],
  ],
  "theme": "reco",
  "themeConfig": {
    "nav": [
      {
        "text": "Home",
        "link": "/",
        "icon": "reco-home"
      },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "Contact",
        "icon": "reco-message",
        "items": [
          {
            "text": "GitHub",
            "link": "https://github.com/heteng99/VuepressNote/tree/master",
            "icon": "reco-github"
          }
        ]
      }
    ],
    "type": "blog",
    "blogConfig": {
      "category": {
        "location": 2,
        "text": "Category"
      },
      "tag": {
        "location": 3,
        "text": "Tag"
      }
    },
    // "logo": "/logo.png",
    "search": true,
    "searchMaxSuggestions": 10,
    "lastUpdated": "hht",
    "author": "hht",
    "authorAvatar": "/avatar.jpeg",
    "record": "gugugu",
    "startYear": "2018"
  },
}