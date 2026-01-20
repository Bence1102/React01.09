import { createContext, useState, useCallback } from "react";
import myAxios, { getAuthHeaders } from "../services/api";


export const MentorContext = createContext();

export const MentorProvider = ({ children }) => {
    const [mentorList, setMentorList] = useState([]);
    const [loadingMentors, setLoadingMentors] = useState(false);
    const [error, setError] = useState(null);

    const getMentors = useCallback(async () => {
        try {
            setLoadingMentors(true);
            setError(null);

            const res = await myAxios.get("/mentors/sessions", {
                headers: getAuthHeaders(),
            });

            console.log("MENTOR API RESPONSE:", res.data);

            setMentorList(res.data.sessions); 
        } catch (err) {
            console.error(err);
            setError("Mentorok lekérdezése sikertelen");
        } finally {
            setLoadingMentors(false);
        }
    }, []);


    return (
        <MentorContext.Provider
            value={{
                mentorList,
                loadingMentors,
                error,
                getMentors,
            }}
        >
            {children}
        </MentorContext.Provider>
    );
};