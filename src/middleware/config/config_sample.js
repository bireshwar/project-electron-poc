let config = {
    SECRET: 'secret',
    FLAG : "LIVE",
    LIVE : {
        mongo : {
            url : "mongodb://wosnic:fegre2015@cluster0-shard-00-00-58w91.mongodb.net:27017,cluster0-shard-00-01-58w91.mongodb.net:27017,cluster0-shard-00-02-58w91.mongodb.net:27017/wosnic?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
        },
        mysql : {
            host: 'database-1.cfy42hfqxo9g.eu-central-1.rds.amazonaws.com',
            user: 'admin',
            password: 'Motihari#123',
            database: 'nodejs'
        },
        amazon : {
            clientID: 'amzn1.application-oa2-client.b8192cede853451c8ad4243c41876930',
            clientSecret: '5425284aa21703db422d1d9ce6ee8cd486200fb534dac641085fb5f43c508da2',
            callbackURL: "http://localhost:7000/auth/amazon/callback",
            passReqToCallback: true,
            accessKeyId : 'AKIATC6O2TN7YHVJGXSV',
            secretAccessKey : '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',
            region : 'eu-central-1'
        },
        facebook : {
            clientID: '337682357458856',
            clientSecret: '3ce05271c93cbbf592b86fbb29388952',
            callbackURL: 'http://localhost:7000/auth/facebook/callback',
            profileFields: ["first_name", "last_name", "emails"],
            passReqToCallback: true
        },
        elasticsearch : {
            url : "https://elastic:yGqgvNOmsR5SoFDT7TFYwRlE@ab9bddf8ab3f489da8bcb3b67b7f6eea.eu-west-1.aws.found.io:9243"
        }
    },
    LOCAL : {
        mongo : {
            url:'mongodb://localhost/wosnicapp',
            useNewUrlParser: true
        },
        mysql : {
            host: 'localhost',
            user: 'root',
            password: 'mysql',
            database: 'project-wosnic'
        },
        amazon : {
            clientID: 'amzn1.application-oa2-client.b8192cede853451c8ad4243c41876930',
            clientSecret: '5425284aa21703db422d1d9ce6ee8cd486200fb534dac641085fb5f43c508da2',
            callbackURL: "http://localhost:7000/auth/amazon/callback",
            passReqToCallback: true,
            accessKeyId : 'AKIATC6O2TN7YHVJGXSV',
            secretAccessKey : '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',
            region : 'eu-central-1'
        },
        facebook : {
            clientID: '298579041326683',
            clientSecret: 'a6f919f0498b3d65d99ed8fad42e36b6',
            callbackURL: 'http://localhost:7000/auth/facebook/callback',
            profileFields: ["first_name", "last_name", "emails"],
            passReqToCallback: true
        },
        elasticsearch : {
            url : "http://localhost:9200"
        }
    }
}

module.exports = config;