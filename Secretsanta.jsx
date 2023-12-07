//Secretsanta.jsx
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, doc, setDoc, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './Config';
import { useNavigate } from 'react-router-dom';
import snowflake from './snowflake.jpg';



import { useEmailsLoaded } from './EmailsLoadedContext';
import CreateEmails from './CreateEmails';

function Secretsanta() {

    const { theUser, setTheUser } = useEmailsLoaded();
    const { groupName, setGroupName, emails, setEmails } = useEmailsLoaded();
    //const { userData } = useAuthUserData();
    const [groupValue, setGroupValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [nameValue, setNameValue] = useState('');
    const [showGroupInput, setShowGroupInput] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [documentId, setDocumentId] = useState('');
    const navigate = useNavigate();

    const { setEmailsLoaded, emailsLoaded } = useEmailsLoaded();


    function submitGroupName() {
        if (groupValue.length > 1) {
            setGroupName(groupValue);
            setGroupValue('');
            setShowGroupInput(false);
            setShowEdit(true);
        } else {
            return;
        }
    }

    function addEmail() {
        if (emailValue.trim() !== '' && nameValue.trim() !== '') {
            // Check if the email is already in the list
            const isDuplicate = emails.some((entry) => entry.email === emailValue);

            if (isDuplicate) {
                //alert('This email has already been entered. Please use a different email.');
                setEmailValue('');
            } else {
                setEmails([...emails, { email: emailValue, name: nameValue }]);
                setEmailValue('');
                setNameValue('');
            }
        }
    }

    function removeEntry(y) {
        const newEmails = [...emails];
        newEmails.splice(y, 1);
        setEmails(newEmails);
    }



    function editGroupName() {
        setShowGroupInput(true);
        setShowEdit(false);
    }



    async function confirmEverything() {
        //console.log('confirmEverything');
        console.log(emails);
        console.log(groupName);
        navigate(`/createemails`)
        setEmailsLoaded(true);
        console.log("last")
    }
    const [revealInput, setRevealInput] = useState(false)

    return (

        <div className='christmasBackground '>


            <button className='funButton' onClick={() => navigate(`/yourpage`)}>Home</button>
            <br />
            <h1 className='heading'>Secret Santa</h1>


            {!revealInput && (
                <div className='sumThing'>
                    <button className='funButton' onClick={() => setRevealInput(true)}>Create a secret santa group</button>

                    <button className='funButton' onClick={() => navigate(`/groups`)}>View your groups</button>
                </div>
            )}
            {revealInput && (
                <div>
                    <p className='paraGraph'> {theUser}, enter the details of your group name and invitees below</p>
                    <div className='buttonNextTo'>
                        <p className='groupTitle'>{groupName}</p>
                        {groupName && showEdit && <button className='editButton' onClick={editGroupName}>Edit</button>}
                    </div>
                    {showGroupInput && (
                        <div className='groupTitleInput'>
                            <input
                                type="text"
                                placeholder="group name"
                                value={groupValue}
                                onChange={(e) => setGroupValue(e.target.value)}
                            />
                            <button className='editButton' onClick={submitGroupName}>Submit</button>

                        </div>
                    )}

                    <br />
                    <div className='eachInvitee'>
                        <input className='nameInput'
                            type="text"
                            placeholder="name"
                            value={nameValue}
                            onChange={(e) => setNameValue(e.target.value)}
                        />
                        <input className='nameInput'
                            type="text"
                            placeholder="email"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                        <button className='addButton' onClick={addEmail}>Add Invitee</button>
                    </div>

                    <div>
                        {emails.map((entry, index) => (
                            <div className='eachInviteeResult' key={index}>
                                <p> {entry.name}</p>
                                <p> {entry.email}</p>
                                <button className='removeButton' onClick={() => removeEntry(index)}>Remove</button>
                            </div>
                        ))}
                    </div>


                    {groupName.length > 1 && emails.length > 1 && (
                        <button className='addButton' onClick={confirmEverything}>Confirm Invitees and Group Name</button>
                    )}
                    {emailsLoaded ? <CreateEmails emails={emails} groupName={groupName} /> : null}

                </div>
            )}
        </div>

    );
}

export default Secretsanta;

