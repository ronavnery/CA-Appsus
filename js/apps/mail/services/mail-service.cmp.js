// need to import utilService
// need to import storageService

let mailsDB;
let gNextId = 1;

export const mailService = {
    queryMails
}

function queryMails() {
    // var mails = storageService.load(MAILS_KEY);
    // if (!mails) {
    const mails = generateMails();
    //   storageService.store(MAILS_KEY, mails)
    // }
    mailsDB = mails;
    return Promise.resolve(mailsDB);
}

function generateMails() {
    let mails = []
    const numOfMails = 10;
    for (let i = 0; i < numOfMails; i++) {
        mails.push(createMail('Ron Avnery',`Hello This is a long subject to test this app' ${gNextId}`,
         'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur porro cum placeat pariatur, quia nam id aspernatur repellat quaerat facere nesciunt vitae quidem itaque! Veritatis suscipit quia voluptates quos minima?'))
    }
    return mails;
}
function createMail(sender, subject, body) {
    return {
        id: gNextId++,
        sender,
        subject,
        body,
        sentAt: Date.now(),
        isRead: false,
        isStarred: false,
        isTrashed: false,
    }
}
