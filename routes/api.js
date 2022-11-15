'use strict';

const StringMatcher = require('../components/kmp.js');
const search = require('../components/checker')
const GoogleScraper = require('../components/googleScrap')
const LevenshteinDistance = require('../components/levenshteinAlg.js')
const Cleaner = require('../components/cleaner')
const multer = require('multer')

module.exports = function (app) {

    const stringMatcher = new StringMatcher();
    const googleScraper = new GoogleScraper();
    const percentageSim = new LevenshteinDistance();
    const cleaner = new Cleaner();

    //front-end
    app.route('/').get(function (req, res) {

        // Rendering home.ejs page
        res.render('homepage')
    })

    app.route('/result')
        .post(multer().fields([{ name: 'firstFile', maxCount: 1 }, { name: 'secondFile', maxCount: 1 }]), (req, res) => {

            if (req.body.source && req.body.target) {
                var [source, target] = [req.body.source, req.body.target]
            }
            else {
                var [source, target] = [req.files.firstFile[0].buffer.toString(), req.files.secondFile[0].buffer.toString()]
            }

            //remove multiple spaces, fullstops, and add the sentences into an array of strings.
            let cleanedSource = cleaner.textCleaner(source).toString()
            let cleanedTarget = cleaner.textCleaner(target).toString()

            const report = {
                sentenceTotal: cleanedSource.length,
                percentageSimilarity: percentageSim.calculateSimilarity(cleanedSource, cleanedTarget),
                levenshteinDistance: percentageSim.levenshteinDistance(cleanedSource, cleanedTarget)
            }

            res.render('resultspage', { report: report.percentageSimilarity, result: '', count: '' })

            return;
        })

    app.route('/webResult')
        .post(async (req, res) => {

            //remove multiple spaces, fullstops, and add the sentences into an array of strings.
            const query = cleaner.textCleaner(req.body.text);

            var result = [];
            // count of total number of sentences, and of plagiarsed ones
            var count = {
                total: query.length,
                plagiarised: 0,
            };

            // iterate over every sentence, find its source, and push to results array
            for (let i = 0; i < query.length; i++) {
                const currQuery = query[i];
                const a = await search(currQuery);

                if (a.length > 0) {
                    result.push({ text: currQuery, url: a[0].url });
                    count.plagiarised += 1;
                } else result.push({ text: currQuery, url: null });
            }
            // render result page with found results and counts
            res.render("resultspage", { result: result, count: count, report: '' });
            return;
        })
};