import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { db, auth } from './Config';


function Groups() {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [content, setContent] = useState(null)

    useEffect(() => {
        const fetchGroups = async () => {
            // Ensure auth.currentUser is available before proceeding
            if (auth.currentUser) {
                const userUid = auth.currentUser.uid;
                // Assuming "pairings" is the subcollection name
                const pairingsCollection = collection(db, 'users', userUid, 'pairings');
                const pairingsSnapshot = await getDocs(pairingsCollection);

                const groupsData = [];
                pairingsSnapshot.forEach((doc) => {
                    const data = doc.data();
                    groupsData.push({ id: doc.id, ...data });
                });

                setGroups(groupsData);
            }
        };

        fetchGroups();
    }, []);



    function showPairings(y) {
        //console.log(y.pairings)
        const theArray = y.pairings;
        console.log(theArray)
        const jsxParagraphs = (
            <div>
                <h2>{y.groupName}</h2>
                {theArray.map((item, index) => (
                    <div className='infoHolder' key={index}>
                        <p>{item.giver} is giving a present to {item.reciever}</p>

                    </div>
                ))}
            </div>
        );

        setContent(jsxParagraphs)
    }


    function handleDustbinClick(y, event) {
        const isDustbinClick = event.target.classList.contains('dustbin');

        if (isDustbinClick) {
            const userUid = auth.currentUser.uid;
            const groupToDelete = y.groupName;
            const pairingsCollection = collection(db, 'users', userUid, 'pairings');
            const q = query(pairingsCollection, where("groupName", "==", groupToDelete));
            getDocs(q).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log("Path of the subcollection:", doc.ref.path);
                    deleteDoc(doc.ref).then(() => {
                        console.log("Document successfully deleted!");
                        // Remove the group from state without reloading the page
                        setGroups((prevGroups) => prevGroups.filter((group) => group.groupName !== groupToDelete));
                    }).catch((error) => {
                        console.error("Error removing document: ", error);
                    });
                });
            });
        }
    }



    return (
        <div className='wholeThing'>
            <button className='funButton' onClick={() => navigate(`/yourpage`)}>
                Home
            </button>
            <h1>Groups</h1>
            <ul className="button-list">
                {groups.map((group) => (
                    <li key={group.id}>
                        <button
                            className="hover-button"
                            onClick={() => showPairings(group)}
                        >
                            {group.groupName}
                        </button>
                        <span
                            className="dustbin"
                            onClick={(event) => handleDustbinClick(group, event)}
                        >🗑️</span>
                    </li>
                ))}
            </ul>
            <div>{content}</div>
        </div>
    );
}

export default Groups;


