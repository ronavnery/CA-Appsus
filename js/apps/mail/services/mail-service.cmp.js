// need to import utilService
// need to import storageService

let mailsDB;
let gNextId = 1;
let gNextSentTime = Date.now();

export const mailService = {
    queryMails,
    parseMail
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
        mails.push(createMail('Ron Avnery',`Subject mothafucka! ${gNextId}`,
         'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur porro cum placeat pariatur, quia nam id aspernatur repellat quaerat facere nesciunt vitae quidem itaque! Veritatis suscipit quia voluptates quos minima?', gNextSentTime-(i*100000000)))
    }
    return mails;
}

function createMail(sender, subject, body, sentAt = Date.now()) {
    return {
        id: gNextId++,
        sender,
        subject,
        body,
        sentAt,
        isRead: false,
        isStarred: false,
        isTrashed: false,
    }
}

function parseMail(mail, key, length = 50) {
    var item = mail[key]
    if (key === 'sentAt') return moment(item).fromNow();
    if (item.length > length) return item.substring(0,length) + '...'
    return item;
}
