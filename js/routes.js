import homePage from './pages/home-page.cmp.js';
import mailApp from './apps/mail/pages/mail-app.cmp.js'
import noteApp from './apps/note/pages/note-app.cmp.js'
import aboutPage from './pages/about-page.cmp.js'
import detailsContentCmp from './apps/mail/cmps/details-content.cmp.js';

export default [
    { path: '/', component: homePage },
    { path: '/mail', component: mailApp, children:
        [
            { path: ':mailId', component: detailsContentCmp}
        ] 
    },
    { path: '/note', component: noteApp },
    { path: '/about', component: aboutPage }
]
