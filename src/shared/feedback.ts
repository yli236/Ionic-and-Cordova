export interface Feedback {
    firstname: string;
    lastname: string;
    telnum: string;
    email: string;
    agree: boolean;
    contacttyle: string;
    message: string;
}

export const ContactType = ['None', 'Tel', 'Email'];