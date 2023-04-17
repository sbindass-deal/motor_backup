import React, { useState } from 'react'

function GiveawaysBackup() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}getPrivacyPolicy`)
            .then(response => {
                console.log(89800, response)
                setData(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div>

            <section class="Htext d-flex align-items-center ptb_80">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-lg-12 col-md-12">
                            <div class="loTryTitle">
                                <h2>
                                    "Gas Guzzlrs"
                                    <span> Giveaway (the “Sweepstakes")</span>
                                </h2>
                            </div>
                        </div>
                        <div class="col-12 col-lg-5">
                            {/* <img src={lotry} /> */}
                        </div>
                    </div>
                </div>
            </section>
            <section class=" align-items-center ">
                <div class="container">
                    <div class="row">
                        <div class="col-12 col-lg-12 col-md-12">
                            <div class="loTryTitle">
                                <h3>
                                    OFFICIAL RULES
                                </h3>
                                <p>NO PURCHASE NECESSARY TO ENTER OR WIN. A PURCHASE OR PAYMENT OF ANY KIND WILL NOT INCREASE YOUR CHANCES OF WINNING.</p>
                                <div class="rte rte--nomargin">



                                    <ol>
                                        <li>
                                            <strong>SWEEPSTAKES DATES:</strong>The Sweepstakes begins at 12:00:00 a.m. Pacific Standard Time (“PST”) on February 6, 2023 and ends at 11:59:59 p.m. PST on April 20, 2023 (the “Sweepstakes Period”). For purposes of these Official Rules, all times are given in Pacific Time.
                                        </li>

                                        <li>
                                            <strong>ELIGIBILITY:</strong>Open to: i) legal permanent United States residents of the forty-eight (48) contiguous United States and the District of Columbia who are at least eighteen (18) years of age or older or nineteen (19) in Alabama and Nebraska and twenty-one (21) in Mississippi, or ii) a legal resident of Canada (excluding residents of the province of Quebec) who are at least the age of majority in his/her province or territory of residence as of the date of entry (the “Entrant”).  Current and past employees, officers and directors of Gass Guzzlrs (the “Sponsor”) and each of its subsidiaries and affiliates, distributors, vendors, advertising/promotion agencies, and any others engaged in the development, production, execution or distribution of the Sweepstakes, including, but not limited to, National Sweepstakes Company, LLC (the “Independent Administrator”) (collectively referred to herein as “Sweepstakes Entities”) as well as their immediate family members (spouses, siblings, children and parents, regardless of where they live) or members of the same households (whether related or not) of such employees, officers and directors are not eligible to participate.  All federal, state and local laws and regulations apply. Sweepstakes is void in Quebec, outside of the forty-eight (48) United States, the District of Columbia, Canada and wherever else prohibited or restricted by law.
                                        </li>


                                        <li>
                                            <strong>TO ENTER: </strong>There are six (6) ways to receive entries into this Sweepstakes:


                                            <ul type="A">
                                                <li>
                                                    <strong><u>VIA A PURCHASE:</u></strong> Visit <a href="http://www.gasmonkeygarage.com">gasmonkeygarage.com</a> (the “Website”) and make a purchase of any product deemed allowable for purchase to receive one (1) entry for every $1USD purchased at the Website. Entrant will need to provide all of the required information as requested in order to submit and complete a purchase. Upon completion of the purchase, Entrant will automatically receive the entry or entries for each $1USD purchased at the Website.&nbsp; Also, Entrants will receive one (1) entry for every $1USD purchase on a gift card; however, use of a gift card to purchase is NOT a qualifying purchase.&nbsp; If an Entrant requests a refund, the refund and cancellation of entries will be determined based on the Sponsor’s refund policy at <a href="https://www.gasmonkeygarage.com/pages/return-policy">https://www.gasmonkeygarage.com/pages/return-policy</a>.&nbsp;

                                                    <p><em>Sponsor may offer additional entries via Purchase during specific timeframes of the Sweepstakes.&nbsp; </em>The number of additional entries will be calculated by multiplying each $1USD purchased by the number listed as a Multiplier listed on the Website. <em>For example, an Entrant making a purchase during of $50USD will receive a total of 250 entries if the multiplier is 5 (50 x 5).&nbsp; </em></p>

                                                </li>

                                                <li>
                                                    <strong><u>VIA STICKER:</u></strong> Upon checkout at the Website, Entrant may opt to purchase a White Monkey Sticker Pack (4) or a Sticker Pack to receive double entries on his/her complete purchase.&nbsp; For example, if an Entrant purchases $50USD on the Website and if the Entrant opts to purchase the a Sticker Pack, he/she would receive a total of one hundred (100) entries. Entrant may only purchase one (1) Sticker Pack per transaction to receive double entries.&nbsp;
                                                    <p></p>
                                                    <p>For the avoidance of doubt, the multipliers listed on the Website do apply to the Sticker pack purchase amount.</p>

                                                </li>

                                                <li>
                                                    <strong><u>VIA BONUS/SUBSCRITPION DEALS:</u></strong> Visit the Website and make a qualifying Bonus or Subscription Deal purchase to receive one thousand (1,000) entries. Entrant will need to provide all of the required information as requested in order to submit and complete a purchase. Upon completion of the purchase, Entrant will automatically receive the one thousand (1,000) entries.&nbsp; If an Entrant requests a refund, the refund and cancellation of entries will be determined based on the Sponsor’s refund policy at <a href="https://www.gasmonkeygarage.com/pages/return-policy">https://www.gasmonkeygarage.com/pages/return-policy</a>.&nbsp;

                                                    <p>For the avoidance of doubt, the multipliers listed on the Website apply to the Bonus/Subscription purchase amount.</p>

                                                    <p>The Bonus/Subscription deals will be listed on the Website during the Sweepstakes.</p>

                                                </li>

                                                <li>
                                                    <strong><u>TWITTER</u></strong>: Complete the entry options below to receive ten (10) entries per Twitter entry method. Entrant must be a registered Twitter® user. To become a registered user, visit <a href="http://www.twitter.com">twitter.com</a>.



                                                    <ol type="i">
                                                        <li>
                                                            <strong>Follow @Gass Guzzlrs:</strong> Follow the Sponsor by clicking on the provided link to receive ten (10) entries into the Sweepstakes.
                                                        </li>
                                                        <li>
                                                            <strong>Tweet: </strong>Tweet a pre-written message on Twitter through the provided link to receive ten (10) entries into the Sweepstakes.

                                                        </li>
                                                        <li>
                                                            <strong>Retweet:</strong> Retweet verbatim, without modifying, changing, or rearranging the pre-written tweet to receive ten (10) entries into the Sweepstakes.
                                                        </li>
                                                    </ol>

                                                    <p>For the avoidance of doubt, the multipliers listed on the Website do not apply to Twitter entries.</p>

                                                </li>

                                                <li>
                                                    <strong>FACEBOOK: </strong>To become a registered user, visit <a href="http://www.faceboook.com">faceboook.com</a><span>. </span>Click on the Sponsor’s Facebook Ad referencing the Sweepstakes to be directed to complete the entry form. Once the entry form is completed and submitted, the Entrant will receive ten (10) entries into the Sweepstakes.&nbsp; Entrant’s may only complete the entry form one time during the Sweepstakes Period to receive ten (10) entries.
                                                </li>

                                                <li>
                                                    <strong>REFERRAL: </strong>An Entrant who makes a purchase may share a unique referral link upon completion of purchase (the “Referrer”). A person that clicks on the unique referral link and purchases (the “Referral”) will receive entries based on the above. The Referrer that referred the Referral will receive two hundred and fifty (250) entries for each Referral that completes purchase.

                                                    <p class="indent">The unique referral link may only be accepted once per Referral and the Referrer cannot use the referral link to purchase to receive additional entries.</p>

                                                    <p class="indent"><strong>Additional Referral Link Requirements</strong>: Every time you send your Referral Link, you must tell people that you will receive Sweepstakes entries if they accept your referral. Telling people that you receive Sweepstakes entries if they accept the referral is a legal requirement. Failure to comply may result in your entries being void and/or your disqualification from the Sweepstakes, and may be a violation of laws enforced by the Federal Trade Commission. You can use the default language provided to share your Referral Link, but at least use: "Accept my referral and I have a chance to win prizes.” You may not refer yourself or create multiple, fictitious or fake accounts to attempt to earn additional entries into the Sweepstakes.</p>

                                                    <p class="indent">You are the actual sender of any emails you may send in connection with this Sweepstakes or post and you must comply with applicable law. Referral Links must be created and distributed in a personal manner that is appropriate and customary for communications with friends, colleagues and family members. By emailing any email address as part of the Sweepstakes, you represent that you have the appropriate permission and consent. Bulk email distribution, distribution to strangers, or any other use of the services described herein in a manner outside the intent of the Sweepstakes is expressly prohibited and may be grounds for immediate disqualification and further legal action. Entrants who do not comply with the law, including anti-spam laws, are obligated to indemnify the Released Parties against any liabilities, costs and expenses they incur as a result of such spam.</p>

                                                    <p class="indent"><em>Referral purchase link should only be shared with someone who you know personally and reasonably believe would be interested in purchasing products from Gass Guzzlrs. Violation of these requirements may result in voiding of all entries and disqualification from the Sweepstakes.&nbsp; The hashtag #Sweepstakes must be included when sharing the referral purchase link, so as to disclose that a “material connection” exists between you and Gass Guzzlrs in that you may receive entries in Gas Monkey Garage’s NAME Sweepstakes by sharing the link with others. If the #Sweepstakes hashtag is omitted, you will not receive any entries even if the recipient of the referral purchase link made a purchase from Gass Guzzlrs as per these Rules. Repeated omission of the #Sweepstakes hashtag may result in voiding of all entries and disqualification from the Sweepstakes.&nbsp; </em></p>

                                                    <p>Neither Sponsor nor Independent Administrator is responsible for any entry that is lost, late, misdirected or undeliverable, whether due to system errors, omissions, interruption, deletions, defects, delay in operations or transmissions, theft or destruction or failures, faulty transmissions or other telecommunications malfunctions, entries not received resulting from any hardware or software failures of any kind, lost or unavailable network connections, failed, incomplete or garbled computer or telephone transmissions, typographical or system errors and failures, faulty transmissions, technical malfunctions, or otherwise.</p>

                                                </li>

                                                <li>
                                                    <strong><u>ALTERNATE METHOD OF ENTRY (“AMOE”):</u></strong> To receive an entry into the Sweepstakes without making a Purchase, Entrant must enter as follows: on a plain 4” x 6” postcard (ENVELOPE ENTRIES WILL NOT BE ACCEPTED), legibly handprint in black ink your first name, last name, complete address, city, state, zip code, telephone number (including area code), date of birth, e-mail address (if available) <strong><u>and send</u></strong> to: “Gas Monkey” Giveaway, PO Box 429, Newark NY&nbsp; Each postcard is considered twenty-five (25) entries into the Sweepstakes. NO ENVELOPES WILL BE ACCEPTED. <strong><u>To receive double entries, hand write “STICKER” in the bottom righthand corner of the postcard.&nbsp; To receive the multiplier, please include the words “ADDITIONAL ENTRIES” hand write in the bottom left-hand side of the postcard and the date so that the correct multiplier can be applied to the entries. </u></strong>Entries must be postmarked by April 20, 2023 and received by April 27, 2023. Entries submitted or completed by anyone other than the Entrant are void.&nbsp; No mechanical reproductions will be accepted. All entries submitted become the sole property of Sponsor and will not be returned.&nbsp; Sweepstakes Entities are not responsible for lost, late, misdirected, illegible, postage due or damaged mailed entries.

                                                </li>

                                                <p><strong>Regardless of the method of entry, there is a limit of fifty thousand (50,000) entries per Entrant during the Sweepstakes Period. </strong></p>

                                                <p><em>Sweepstakes is in no way sponsored, endorsed or administered by, or associated with Twitter or Facebook. You understand that you are supplying your information to the Sponsor and not to Twitter or Facebook.</em></p>

                                                <p>Without limitation, Sponsor reserves the right in their sole discretion to disqualify any Entrant whose social media account that, in their sole opinion, refers, depicts or in any way reflects negatively upon the Sponsor, the Sweepstakes or any other person or entity; does not comply with these Official Rules; or if Sponsor receives notification about any potential infringements or breaches of law or any other reason set forth herein.</p>

                                                <p>In the event of a dispute regarding the identity of the person who submitted an entry, the entry will be deemed submitted by the Authorized Account Holder (defined below) of the e-mail address connected with the email account from which the entry was made. “Authorized Account Holder” is defined as the natural person who is assigned to an e-mail address by the Internet access provider, online service provider, or other organization (e.g., business, educational institution, etc.) that is responsible for assigning e-mail addresses for the domain associated with the submitted e-mail address. An Entrant may be requested to provide Sponsor with proof that the Entrant is the Authorized Account Holder of the email address associated with the entry. Any attempt by any Entrant to enter this Sweepstakes using multiple/different accounts or any other methods may void the Entrant’s entries and may result in disqualification, at the sole discretion of Sponsor. Use of any automated system to participate in the Sweepstakes is prohibited and may result in disqualification. The Sweepstakes Entities are not responsible for any entry that is lost, late, misdirected or&nbsp; undeliverable, whether due to system errors, omissions, interruptions, deletions, defects, delays in operation or transmissions or any other reason, theft or destruction or failures, faulty transmissions or other telecommunication malfunctions, entries not received resulting from any hardware or software failures of any kind, lost or unavailable network connections, failed, incomplete or garbled computer or telephone transmissions, typographical or system errors and failures, technical malfunctions, or otherwise. Late entries or entries sent via any other method than those stated above will not be accepted.</p>

                                            </ul>



                                        </li>
                                        <li>
                                            <strong>WINNING/ODDS: </strong>There will be one (1) random drawing held on or about May 1, 2023 at 2:00 pm Eastern Standard Time in Newark, NY. One (1) grand prize winner (the “Grand Prize Winner”) will be selected from among all eligible entries received during the Sweepstakes&nbsp; Odds of winning the grand prize (“Grand Prize”) will depend upon the total number of eligible entries received during the Sweepstakes Period. The random drawing will be conducted by the Independent Administrator, whose decisions are based upon its sole discretion and interpretation of these Official Rules and are final and binding in all respects.
                                        </li>


                                        <li>
                                            <strong>PRIZE</strong>:<br />

                                            <p><strong>GRAND PRIZE</strong>:&nbsp; One (1) Grand Prize of a trip for the Grand Prize Winner and two (2) guests to Richard Rawlings personal garage, one (1) 2023 Dodge Challenger with options to be selected by the Grand Prize Winner having a value not to exceed $105,000USD, $25,000 cash to be awarded in the form of a check, and $5,000 for the trip portion of the prize.&nbsp; Total approximate retail value of the Grand Prize is $135,000USD.&nbsp; Grand Prize Winner will be able to select up to two (2) friends to be his/her guest (the “Guests”).&nbsp; The Guests must also meet the eligibility requirements outlined in these Official Rules.&nbsp; The Grand Prize Winner will receive: i) roundtrip first class airfare to and from a major airport nearest their residence and Dallas, TX, ii) one (1) hotel room accommodation for two (2) days/ one (1) night, each room will be a standard quad occupancy room (Sponsor to determine the hotel accommodations at their discretion and is inclusive of room rate and tax only), iii) roundtrip ground transportation to/from the airport and hotel and to/from the hotel and the garage, iv) dinner at the garage, and v) the 2023 Dodge Challenger vehicle not to exceed $105,000 (the “Grand Prize”).&nbsp; Color, Options and Accessories to be determined at the sole discretion of the Sponsor, but may be selected by the Grand Prize Winner.&nbsp; The vehicle may have mileage and the Grand Prize Winner is responsible for requesting any mileage on the vehicle.&nbsp; Grand Prize Winner must have and provide a valid Driver’s License and provide proof of existing Vehicle Insurance Coverage (Comprehensive or Liability) at time of delivery. Grand Prize Winner will be solely responsible for any applicable registration, license, title and insurance fees, all taxes (federal, state, local, municipal, sales and/or income) and any expenses not listed herein related to the acceptance and use of the Grand Prize.&nbsp; Sponsor does not make, nor is Sponsor in any manner responsible or liable for any warranty, representation or guarantee, express or implied, in fact or in law, relative to the Grand Prize, including but not limited to its quality, fitness for purpose or mechanical condition; the only representation/warranty/guarantee that may be provided, if any, are those of the manufacturer and/or dealer.&nbsp; Grand Prize Winner must accept delivery of the vehicle or pick up the vehicle within 7 days of notification that the vehicle is ready.&nbsp; Grand Prize Winner is required to comply with any and all applicable federal, state and local laws, rules and regulations including, but not limited to licensing and insurance requirements.&nbsp; <strong><em><u>In the event that the vehicle is unavailable the Sponsor reserves the right to award the Grand Prize Winner $105,000 cash in the form of a check.</u></em></strong></p>



                                            <p><strong>VEHICLE CONDITIONS:</strong>&nbsp; The Grand Prize Winner shall bear all risk of loss or damage to the vehicle after it has been delivered. &nbsp;The depiction of the vehicle in any advertising or promotional materials or physical display may not reflect the actual vehicle onsite at the time the Grand Prize is awarded. &nbsp;Grand Prize Winner will only have the option to select the vehicle that are onsite at the time of award.</p>


                                            <p>Trip, travel, and lodging elements may be subject to change due to impracticability or unavailability, or for any other reason as determined necessary by Sponsor or its designee.&nbsp; Tickets are subject to the terms and conditions of issuer and will not be replaced if lost, stolen, misplaced, damaged or destroyed. ARV may vary, depending on the point, date and time of departure. Grand Prize must be accepted as a whole or will be forfeited in its entirety. All travel arrangements must be made through a travel agent or entity selected by Sponsor. Grand Prize Winner and Guests wi<span>ll be responsible for all meals, transportation (other than described above), travel insurance, tips, room service, laundry service, souvenirs or gratuities, fuel, parking, beverages, telephone calls, overages, baggage fees, extras and any other incidental costs or expenses not specifically stated herein as being included.<strong> &nbsp;</strong>Specific air carrier(s) and other trip specifics are selected at the sole discretion of the Sponsor. &nbsp;Travel must originate and end at the same major gateway airport. </span>Grand Prize Winner and Guests will be required to obtain any travel related documents and maintain all insurance (including health, liability and any other insurance along with any documentation for vaccination for COVID-19 requirements).&nbsp; Grand Prize Winner and Guests acknowledge and agree that the Sweepstakes Entities are not providers/carriers of transportation, or insurance providers. No changes will be made to travel details once any element(s) of the travel arrangements have been booked. No frequent flier miles will be earned on any element of prize travel.&nbsp; Grand Prize conditions may be added or modified by Sponsor or its designee. Sweepstakes Entities are not responsible for any changes of any element of the Grand Prize, nor are they liable for any expenses incurred as a consequence of flight/event changes, cancellation or delays. A Grand Winner or Guest later found ineligible or non-compliant will be immediately required to return and forfeit any prize awarded. In the event Grand Prize Winner and/or Guests engage in behavior that, as determined by Sponsor (or its designee) in their absolute discretion, is obnoxious or threatening, dangerous, illegal or that is intended to annoy, abuse, threaten or harass any other person, or may cause harm, property damage or any other loss, Sponsor reserves the right to terminate the trip early, in whole or in part, and to send the Grand Prize Winner and Guests home with no further compensation.</p>


                                            <p>Total ARV of all prizes to be awarded is $135,000USD.</p>


                                            <p><strong>PRIZE RESTRICTIONS:</strong>&nbsp; Grand Prize cannot be substituted, assigned, transferred, or redeemed for cash except at Sponsor’s sole discretion or as otherwise provided herein.&nbsp; Sponsor reserves the right to substitute Grand Prize with a prize of comparable or greater value if advertised Grand Prize should become unavailable.&nbsp; Grand Prize Winner is required to comply with any and all applicable federal, state, provincial and local laws, rules and regulations. The Grand Prize Winner is solely responsible for any taxes on the Grand Prize he/she has received, including but not limited to any and all federal, state and local taxes.&nbsp; No more than the one (1) Grand Prize as set forth in these Official Rules will be awarded.</p>
                                        </li>


                                        <li>
                                            <strong> </strong><strong>PRIZE CLAIM: </strong>Grand Prize Winner will be notified via the contact source provided at the time of registration within five (5) business days of the drawing date.<strong>&nbsp; </strong>Except where prohibited, the potential Grand Prize Winner must sign and return to the Independent Administrator an affidavit of eligibility/release of liability/publicity release (the “Release”) and IRS form W-9 (US Residents) or IRS form W-8BEN (Canadian Residents) in order to claim the Grand Prize (collectively, the “Required Documents”) within the time frame indicated in the Notification. Guests must also complete a Travel Companion Waiver form.&nbsp; If the Grand Prize Winner is a Canadian Resident, he/she must correctly complete a mathematical skill testing question. If the potential Grand Prize Winner fails to sign and return the Required Documents within the required time period, or incorrectly answers the mathematical skill testing question, the potential Grand Prize Winner forfeits his/her right to the Grand Prize and an alternate Grand Prize Winner will be selected at random from among all remaining non-winning eligible entries received during the Sweepstakes Period. The Grand Prize is taxable as income and the Grand Prize Winner is solely responsible for any taxes on the Grand Prize, including, but not limited to all applicable federal, state, provincial and local taxes. The Independent Administrator must report the value of the Grand Prize to the IRS in the year the Grand Prize is received by the Grand Prize Winner and will be reported to the Grand Prize Winner and the IRS in the form of a Form 1099 for Form 1042-S.&nbsp; In the event it is deemed during the verification process that the potential Grand Prize Winner does not have a unique, personal and valid social security number for Sponsor (or any party acting on its behalf) to report the tax liability associated with acceptance of the Grand Prize, the potential Grand Prize Winner will be disqualified and another potential Grand Prize Winner will be selected from among the remaining non-winning eligible entries received during the Sweepstakes Period.&nbsp; Valid social security numbers will be determined by IRS requirements.

                                            <p>Each prize winner consents to use of his/her name, likeness, biographical information, and voice (or any derivation thereof) in advertising worldwide without additional compensation (TN residents will not be required to sign a publicity release as a condition of winning a prize).</p>

                                        </li>

                                        <li>
                                            <strong>GENERAL:</strong> All federal, state, provincial and local taxes on a prize are the sole responsibility of the Grand Prize Winner, if applicable.&nbsp; By participating in this Sweepstakes, each Entrant agrees:&nbsp; [a]&nbsp; to abide by and be bound by these Official Rules and the decisions of the Sponsor and Independent Administrator which shall be final in all respects relating to the Sweepstakes, including without limitation the interpretation of these Official Rules; [b] to release, discharge and hold harmless Sponsor, its franchisees, licensees, subsidiaries, affiliates, Twitter, Facebook, advertising agencies, promotional agencies and suppliers, and any other individual or company involved in the development or execution of the Sweepstakes, including the Independent Administrator, from any and all injuries, liability, losses, damages, rights, claims and actions of any kind including liability for personal injury or death resulting from his/her participation in the Sweepstakes or their acceptance, use or misuse of a prize; and&nbsp; [c] if a prize winner, to the use of his/her name, voice, image and/or likenesses for advertising, publicity and promotional purposes by Sponsor and Sponsor’s subsidiaries and affiliates without further notice or compensation (unless prohibited by law) and, except where prohibited, to execute specific consent to such use if asked to do so.&nbsp; Sponsor, its licensees, subsidiaries, affiliates, advertising agencies, promotional agencies and suppliers and any other individual or company involved in the development or execution of the Sweepstakes, including the Independent Administrator, and each of their respective directors, officers, shareholders and employees are not responsible and shall not be liable for; [a] electronic transmission errors resulting in omission, interruption, deletion, defect, delay in operations or transmission, theft or destruction; [b] unauthorized access to or alterations of entry materials; [c] technical, network, telephone equipment, electronic, computer, hardware or software malfunctions; or [d] limitations of any kind or inaccurate transmissions of or failure to receive information by Sponsor on account of technical problems or traffic congestion on the Internet or at any website or any combination thereof. Sponsor and / or Independent Administrator are not responsible for lost, late, incomplete, incorrect, damaged, misdirected, or illegible entries or any condition caused by events beyond the control of the Sponsor that may cause the Sweepstakes to be disrupted or corrupted.&nbsp;&nbsp; Sponsor may prohibit an Entrant from participating in the Sweepstakes or winning a prize if, in its sole discretion, it determines that said Entrant is attempting to undermine the legitimate operation of the Sweepstakes by cheating, deception, or other unfair playing practices&nbsp; or intending to annoy, abuse, threaten or harass any other Entrants, Sponsor, or Independent Administrator.&nbsp; Entries which contain false information, are incomplete, inaccurate or are otherwise forged, defective, or made outside authorized channels, including those which have failed due to malfunction or failure of phones, phone lines, telephone systems or networks, server, providers, computer equipment, software or any combination thereof of any kind, any human error or otherwise, shall be void. CAUTION: ANY ATTEMPT BY A PERSON TO DELIBERATELY DAMAGE OR UNDERMINE THE LEGITIMATE OPERATION OF THE SWEEPSTAKES MAY BE IN VIOLATION OF CRIMINAL AND CIVIL LAWS AND SHOULD SUCH AN ATTEMPT BE MADE, SPONSOR RESERVES THE RIGHT TO SEEK REMEDIES AND DAMAGES (INCLUDING ATTORNEY’S FEES) FROM ANY SUCH PERSON TO THE FULLEST EXTENT OF THE LAW, INCLUDING CRIMINAL PROSECUTION. SPONSOR’S FAILURE TO ENFORCE ANY TERM OF THESE OFFICIAL RULES SHALL NOT CONSISTIUTE A WAIVER OF THESE PROVISIONS.&nbsp; If, for any reason whatsoever, this Sweepstakes, in Sponsor’s sole opinion, is not capable of running as planned, including, but not limited to, by reason of infection by computer virus, tampering, fraud, technical failures, or any other cause which, in the Sponsor’s sole judgment, corrupts or affects the administration, security, fairness, integrity or proper conduct of this Sweepstakes, Sponsor reserves the right at its sole discretion to cancel, terminate, modify or suspend this Sweepstakes and limit entries to those submitted prior to the action taken, or to proceed in such a manner as may be deemed fair and equitable by Sponsor in its sole discretion. Notice of such action will be posted on the Website. All federal, state and local regulations apply.&nbsp; ENTRANTS AGREE THAT: (1) ANY AND ALL DISPUTES, CLAIMS AND/OR CAUSES OF ACTION ARISING OUT OF OR CONNECTED WITH THIS SWEEPSTAKES OR THE PRIZE AWARDED SHALL BE RESOLVED INDIVIDUALLY, WITHOUT RESORT TO ANY FORM OF CLASS ACTION AND IN ACCORDANCE WITH THE LAWS OF THE STATE OF NEW YORK WITHOUT REGARD TO PRINCIPLES OF CONFICTS OF LAW; (2) ANY AND ALL CLAIMS, JUDGMENTS AND AWARDS SHALL BE LIMITED TO ACTUAL OUT-OF-POCKET COSTS INCURRED, INCLUDING COSTS ASSOCIATED WITH ENTERING THIS SWEEPSTAKES, IF ANY, BUT IN NO EVENT WILL ENTRANT BE ENTITLED TO RECEIVE ATTORNEYS’ FEES OR BE ENTITLED TO RECOVER PUNITIVE, EXEMPLARY, INCIDENTAL OR CONSEQUENTIAL DAMAGES.
                                        </li>

                                        <li>
                                            <strong> SPONSOR:</strong> Gass Guzzlrs, 2340 Merrell Road, Dallas, TX 75229.
                                        </li>

                                        <li>
                                            <strong> INDEPENDENT ADMINISTRATOR:</strong> National Sweepstakes Company, LLC, 1143 East Union St, Newark, NY&nbsp; 14513.&nbsp;
                                        </li>

                                        <li>
                                            <strong></strong> <strong>WINNERS’ LIST REQUEST: </strong>To receive the name of the Grand Prize Winner, send a self-addressed, stamped (business size) envelope to: “Gas Monkey” Winners List Request, PO Box 458, Newark, NY 14513. Requests must be received by June 1, 2023.
                                        </li>

                                        <li>
                                            <strong> OFFICIAL RULES: </strong>Visit the Website for a copy of these Official Rules during the Sweepstakes Period.


                                            <p><em>This Sweepstakes shall not be published without written permission by Sponsor.</em></p>


                                        </li>

                                    </ol>


                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-5">
                            {/* <img src={lotry} /> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default GiveawaysBackup