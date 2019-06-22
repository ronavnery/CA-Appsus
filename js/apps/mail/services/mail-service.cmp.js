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
    let mails = [
        createMail('Yonatan Gailli', 'yoanatan@gmail.com', `Are you done yet?`,
    'Hi friend, I loved your work yesterday. Great stuff. cant wait to get it  ', gNextSentTime),
        createMail('Ron Avnery', 'avnery@gmail.com', `Re: Regarding you insurance claim`,
    'Let’s Lorem efin ipsum times twenty four', gNextSentTime-(1*100000000)),
        createMail('Yonatan Gailli', 'yonatan@gmail.com', `When do you think you will be done?`,
    'Boy are you fast! Hope your GF doesnt also, you know... ', gNextSentTime-(2*100000000)),
        createMail('Ben Cohen', 'benc990@gmail.com', `Hi Friend`,
    'Where is my money? You said yould pay me back for the Pizza I bought you and ...', gNextSentTime-(3*100000000)),
        createMail('Yaron Biton', 'yaronush@gmail.com', `Lets go fishing at your earliest convenience`,
    'Me dying for some Sushi', gNextSentTime-(4*100000000)),
        createMail('Dorris Katzavim', 'dorkatz@hotmail.com', `U R Hot`,
    'Looking for Polish Bride? send me bank acount info for pretty bride', gNextSentTime-(5*100000000)),
        createMail('Apple', 'do-not-reply@shitass.com', `Please buy our latest shie`,
    'A spectacular $43,00 Mouse made out of carbon fiber and absolutely lovely whit...', gNextSentTime-(6*100000000)),
        createMail('Prince Motombo Kalumbo', 'imaprince@nigeria.com', `Help me please`,
    'I am the son of a Nigerian king and I stuck in hospital', gNextSentTime-(7*100000000)),
    ]
    // to push more emails:
    // const numOfMails = 10;
    // for (let i = 0; i < numOfMails; i++) {
    //     mails.push(createMail('Ron Avnery',`Subject mothafucka! ${gNextId}`,
    //      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur porro cum placeat pariatur, quia nam id aspernatur repellat quaerat facere nesciunt vitae quidem itaque! Veritatis suscipit quia voluptates quos minima?', gNextSentTime-(i*100000000)))
    // }
    return mails;
}

function createMail(sender, address, subject, body, sentAt = Date.now()) {
    return {
        id: gNextId++,
        sender,
        address,
        subject,
        body,
        sentAt,
        isRead: false,
        isStarred: false,
        isTrashed: false,
        isSent: false,
        isSelected: false
    }
}

function parseMail(mail, key, length = 50) {
    var item = mail[key]
    if (key === 'sentAt') {
        if (Date.now() - item < 86400000) return moment(item).format('hh:mm a')
        else if (Date.now() - item > 86400000 && Date.now() - item < 172800000) return moment(item).fromNow();
        else return moment(item).format('LL');
    }
    if (item.length > length) return item.substring(0,length) + '...'
    return item;
}

function getRandomBoolean() {
    return (Math.random() > 0.5)
}
