import {useEffect, useState} from 'react'
import './App.css'
import {IMember, IMemberCreate} from "./@types";
import {memberApiService} from "./services/api";

function App() {
    const [members, setMembers] = useState<IMember[]>([]);
    const [newMemberName, setNewMemberName] = useState<string>("");

    useEffect(() => {
        memberApiService.get().then((members) => {
            setMembers(members);
        });
    }, []);

    const addMember = () => {
        const newMember: IMemberCreate = {
            name: newMemberName,
        };
        memberApiService
            .create(newMember)
            .then((member) => {
                setMembers([...members, member]);
                setNewMemberName("");
            })
            .catch((err) => {
                alert(err);
            })
    }

    const deleteMember = (member: IMember) => {
        memberApiService.delete(member.id).then(() => {
            setMembers(members.filter((m) => m.id !== member.id));
        });
    }

    const updateMember = (member: IMember) => {
        memberApiService.update(member.id, member).then((updatedMember) => {
            setMembers(
                members.map((m) => (m.id === updatedMember.id ? updatedMember : m))
            );
        });
    }


    return (
        <>
            <div>
                <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                />
                <button onClick={addMember}>Add</button>
            </div>
            <div>
                <ul>
                    {members.map((member) => (
                        <li key={member.id}>
                            <input
                                type="text"
                                value={member.name}
                                onChange={(e) =>
                                    updateMember({...member, name: e.target.value})
                                }
                            />
                            <button onClick={() => deleteMember(member)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default App
