import { utilService, MAILS_DB } from '../../../services/utils.service.js'

let mailsDB;
let gNextId = 1;
let gNextSentTime = Date.now();

export const mailService = {
    queryMails,
    parseMail,
    getMailById,
    createMail,
    pushNewMail
}

function queryMails() {
    var mails = utilService.loadFromStorage(MAILS_DB);
    if (!mails) {
    const mails = generateMails();
      utilService.saveToStorage(MAILS_DB, mails)
    }
    mailsDB = mails;
    return mailsDB;
    // return Promise.resolve(mailsDB);
}

function generateMails() {
    let mails = [
        createMail('Jigar Patel', 'jig_patel_1982@yahoo.com', `How big scientist you are let's see`,
            ` beat you after reading this research article you will believe that I am  more intelligent then you. Article is available on 
            http://energyefficientmechanism.blogspot.com/
            
            Thanking you
            Jigar Y. Patel
            403 Varun Apartments,
            R.M.V 2nd Stage,
            Nagshettihali,
            Bangalore-560094,
            India
            `, gNextSentTime),
            createMail('Ebay', 'customer-support@ebay.com', `RE: Invoice for eBay item #7630018502 Sony DSR11 DSR-11 DVCAM Deck  `,
            `The way the process works is we first make you an offer within 24 hours.  You will get an email with your ElectronixMax quote number and offer, and the email will have a PDF attachment with all the details of your offer.  If you like the offer, which we will do our best to make sure that is the case,
            you will simply need to follow the steps
            
            ____________________________________________
            Re: GBA  
            
            I am posting it on my FTP. It will be there in about an hour.
            There will be two files: one file is an MPEG-4 (compressed pic/sound)
            and one file is AIFF full quality sound.
            
            to download go to ftp.jonathan-ko.com
            user : download
            password: files
            
            Please use the high quality sound (the aiff file).
            Let me know if there are problems.
            JG
            `, gNextSentTime - (1 * 100000000)),
        createMail('Yonatan Gailli', 'yoanatan@gmail.com', `Are you done yet?`,
            'Hi friend, I loved your work yesterday. Great stuff. cant wait to get it  ', gNextSentTime - (3 * 100000000)),
        createMail('Ron Avnery', 'avnery@gmail.com', `Re: Regarding you insurance claim`,
            'Let’s Lorem efin ipsum times twenty four', gNextSentTime - (4 * 100000000)),
        createMail('Yonatan Gailli', 'yonatan@gmail.com', `When do you think you will be done?`,
            'Boy are you fast! Hope your GF doesnt also, you know... ', gNextSentTime - (5 * 100000000)),
        createMail('Ben Cohen', 'benc990@gmail.com', `Hi Friend`,
            'Where is my money? You said yould pay me back for the Pizza I bought you and ...', gNextSentTime - (5 * 100000000)),
        createMail('Yaron Biton', 'yaronush@gmail.com', `Lets go fishing at your earliest convenience`,
            'Me dying for some Sushi', gNextSentTime - (6 * 100000000)),
        createMail('Dorris Katzavim', 'dorkatz@hotmail.com', `U R Hot`,
            'Looking for Polish Bride? send me bank acount info for pretty bride', gNextSentTime - (8 * 100000000)),
        createMail('Apple', 'do-not-reply@shitass.com', `Please buy our latest shie`,
            'A spectacular $43,00 Mouse made out of carbon fiber and absolutely lovely whit...', gNextSentTime - (9 * 100000000)),
        createMail('Prince Motombo Kalumbo', 'imaprince@nigeria.com', `Help me please`,
            'I am the son of a Nigerian king and I stuck in hospital', gNextSentTime - (10 * 100000000)),

        createMail('Lisa', 'lisa@kariio.com', `Tonight!!! LOVE, LABOR, LOSS Feature Film Release  `,
            'Hi! please RSVP as seats are very limited. If you plan to come to the NYC celebration – feature film screening, spoken word performances by Urban Word NYC poets who pre-screened the film and a networking/cocktail reception with special guests, please email me asap and I will add your name to the list. See you, Lisa.', gNextSentTime - (11 * 100000000)),
        createMail('Anat Kron', 'anat@gmail.com', `Hi again...`,
            `Hi ,
            Thanks for writing back but if you don't mind I would rather talk on the phone.
            You can reach me at 646-234-3695.
            I don't think I need voice over. Just maybe an image of my book
            or website, maybe taken from this website
             
            Have a glorious day  
            Anat
            __________________________________________________________________________
            `, gNextSentTime - (14 * 100000000)),
        createMail('David Dobes', 'daviddob22@gmail.com', `Hello...  My name is David..`,
            `Hello...  My name is David, a Member of the Confederation of the Food and Drink Industries of the EU, France president of the Union of European Union Group of The Coca-Cola Company.Right now we are working on a job for Coca cola in the United states and UK ,France,Canada. I’d like to know if you are interested in modeling, for your photos would be displayed on billboards, magazines and all major international airports in the USA.We go around selecting pictures and photos that fit the required standard we have set down, from different sites on the Internet such as dating and modeling sites. I saw your photo on this site and i think they fit our criteria perfectly.Please let me know if you are interested in this Job. For starters, you get a  $450 before photo shoot after which you may negotiate your contract pay.Its also may be a chance to attain noticeable fame.Please do not reply via this site, as your mail would not be answered. Get back to  me via if you are interested in this offer and I would give you further details.  all the best, David`, gNextSentTime - (19 * 100000000))
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

function pushNewMail(newMail) {
    let mails = utilService.loadFromStorage(MAILS_DB);
    mails.unshift(newMail)
    utilService.saveToStorage(MAILS_DB, mails)
}

function parseMail(mail, key, length = 50) {
    var item = mail[key]
    if (key === 'sentAt') {
        if (Date.now() - item < 86400000) return moment(item).format('hh:mm a')
        else if (Date.now() - item > 86400000 && Date.now() - item < 172800000) return moment(item).fromNow();
        else return moment(item).format('LL');
    }
    if (item.length > length) return item.substring(0, length) + '...'
    return item;
}

function getMailById(mailId) {
    const mail = mailsDB.find(mail => mail.id === mailId);
    return Promise.resolve(mail);
}
