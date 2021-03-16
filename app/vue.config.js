const ThreeExamples=require('import-three-examples')


module.exports={
    pluginOptions:{
        ...ThreeExamples
    },
    devServer:{
        proxy:{
            '/api':
                {
                    target:'http://127.0.0.1:5000',
                    logLevel:'debug'
                }

        }
    }

}
