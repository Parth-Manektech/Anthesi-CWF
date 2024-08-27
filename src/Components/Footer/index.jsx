import React, { useState } from 'react'
import { CaretRight, FacebookLogo, InstaLogo, MailIcon, SortDown, Twitterlogo, YouTubeLogo } from '../../Assets/SVGs'

function Footer() {
    const [linkToggle, setLinkToggle] = useState(false)
    return (
        <footer className="it-footer footer">
            <div className="it-footer-main">
                <div className="container">
                    <section className='pt-4'>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-6 pb-2">
                                <h4>
                                    <a href="#" title="Amministrazione">Amministrazione</a>
                                </h4>
                                <div className="link-list-wrapper">
                                    <ul className="footer-list link-list clearfix">
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Giunta e consiglio">Giunta e consiglio</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Aree di competenza">Aree di competenza</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Dipendenti">Dipendenti</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Luoghi">Luoghi</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Associazioni e società partecipate">Associazioni e società partecipate</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='Link-button mb-3 d-flex d-sm-none align-items-center' onClick={() => setLinkToggle(!linkToggle)}>
                                {linkToggle ? <SortDown className='mb-1' height={15} width={15} fill='#0066CC' /> : <CaretRight height={15} width={15} fill='#0066CC' />} Link
                            </div>

                            <div className={`${!linkToggle ? 'd-none' : 'd-inline'} d-sm-inline col-lg-2 col-md-2 col-sm-6 pb-2`}>
                                <h4>
                                    <a href="#" title="Vai alla pagina: Servizi">Servizi</a>
                                </h4>
                                <div className="link-list-wrapper">
                                    <ul className="footer-list link-list clearfix">
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Pagamenti">Pagamenti</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Sostegno">Sostegno</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Domande e iscrizioni">Domande e iscrizioni</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Segnalazioni">Segnalazioni</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Autorizzazioni e concessioni">Autorizzazioni e concessioni</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Certificati e dichiarazioni">Certificati e dichiarazioni</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`${!linkToggle ? 'd-none' : 'd-inline'} d-sm-inline col-lg-2 col-md-2 col-sm-6 pb-2`}>
                                <h4>
                                    <a href="#" title="Vai alla pagina: Novità">Novità</a>
                                </h4>
                                <div className="link-list-wrapper">
                                    <ul className="footer-list link-list clearfix">
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Notizie">Notizie</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Eventi">Eventi</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Comunicati stampa">Comunicati stampa</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className={`${!linkToggle ? 'd-none' : 'd-inline'} d-sm-inline col-lg-4 col-md-4 col-sm-6 pb-2`}>
                                <h4>
                                    <a href="#" title="Vai alla pagina: Documenti">Documenti</a>
                                </h4>
                                <div className="link-list-wrapper">
                                    <ul className="footer-list link-list clearfix">
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Progetti e attività">Progetti e attività</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Delibere, determine e ordinanze">Delibere, determine e ordinanze</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Bandi">Bandi</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Concorsi">Concorsi</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Albo pretorio">Albo pretorio</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="py-4 border-white border-top ">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 pb-2">
                                <h4><a href="#" title="Vai alla pagina: Contatti">Contatti</a></h4>
                                <p >
                                    <strong>Comune di Lorem Ipsum</strong><br />
                                    Piazza Lorem ipsum dolor, 23 09872 Nome della città<br />
                                    (AA) - CF 0985649876
                                </p>
                                <div className="link-list-wrapper">
                                    <ul className="footer-list link-list clearfix">
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Posta Elettronica Certificata">indirizzopecdellente@pec.gov.it</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Posta Elettronica Certificata">+39 0609090909a</a></li>
                                        <li>
                                            <a className="list-item" href="#" title="Vai alla pagina: URP - Ufficio Relazioni con il Pubblico">URP - Ufficio Relazioni con il Pubblico</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="d-none d-sm-inline col-lg-2 col-md-2 pb-2">
                                <h4><a href="#" title="Vai alla pagina: Lorem Ipsum">Lorem Ipsum</a></h4>
                                <div className="link-list-wrapper">
                                    <ul className="footer-list link-list clearfix">
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Pagamenti">Dichiarazione di Accessibilità </a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Sostegno">Statistiche dei Siti web</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Domande e iscrizioni">Amministrazione trasparente</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="d-none d-sm-inline col-lg-2 col-md-2 pb-2">
                                <h4><a href="#" title="Vai alla pagina: Lorem Ipsum">Lorem Ipsum</a></h4>
                                <div className="link-list-wrapper">
                                    <ul className="footer-list link-list clearfix">
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Pagamenti">Et vivamus sit </a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Sostegno">Vitae cras quam</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Domande e iscrizioni">Morbi nulla cursus</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Domande e iscrizioni">Lectus nisl, est</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Domande e iscrizioni">Euismod massa ultricies</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-4 pb-2">
                                <div className="pb-2 border-black border-sm-white border-top ">
                                    <h4><a href="#" title="Vai alla pagina: Seguici su">Seguici su</a></h4>
                                    <div className="d-flex gap-4">
                                        <FacebookLogo aria-label="Facebook" />
                                        <InstaLogo aria-label="Instagram" />
                                        <Twitterlogo aria-label="Twitter" />
                                        <YouTubeLogo aria-label="YouTube" />
                                    </div>
                                    <div className='border-black border-sm-white border-top mt-5'>
                                        <h4 className='mt-2'><a href="#" title="Vai alla pagina: NEWSLETTER">NEWSLETTER</a></h4>
                                        <form className="newsletter-form">
                                            <div className="form-group">
                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <MailIcon />
                                                    </span>

                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="input-group-2"
                                                        name="input-group-2"
                                                        placeholder="indirizzo email"
                                                    />
                                                    <button>ISCRIVITI</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="d-inline d-sm-none col-lg-2 col-md-2 pb-2 border-black border-sm-white border-top pt-3">
                                <div className="link-list-wrapper">
                                    <ul className="footer-list link-list clearfix">
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Pagamenti">Dichiarazione di Accessibilità </a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Sostegno">Statistiche dei Siti web</a></li>
                                        <li><a className="list-item" href="#" title="Vai alla pagina: Domande e iscrizioni">Amministrazione trasparente</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div >
            <div className="it-footer-small-prints clearfix">
                <div className="container">
                    <ul className="it-footer-small-prints-list align-items-center mb-0 flex-row">
                        <li className="list-inline-item"><a href="#" title="Note Legali">Media policy</a></li>
                        <li className="list-inline-item"><a href="#" title="Note Legali">Note legali</a></li>
                        <li className="list-inline-item"><a href="#" title="Privacy-Cookies">Privacy policy</a></li>
                        <li className="list-inline-item"><a href="#" title="Mappa del sito">Mappa del sito</a></li>
                    </ul>
                </div>
            </div>
        </footer >
    )
}

export default Footer