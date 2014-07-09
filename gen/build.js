var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    permalinks = require('metalsmith-permalinks')


Metalsmith(__dirname)
    .use(markdown())
    .use(templates('handlebars'))
    .use(permalinks({
        pattern: ':date/:tile',
    }))
    .destination('../')
    .clean(false)
    .build(function(err) {
        if(err) console.log(err)
        console.log('build done')
    })
