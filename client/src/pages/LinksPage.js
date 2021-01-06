import React, {useState, useContext, useCallback, useEffect} from 'react'
import {useHttp} from "../hooks/httphook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkList} from "../components/LinkList";

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) {
            
        }
    }, [token, request])

    useEffect(() => {
        fetchLinks()
    }, [])

    if (loading){
        return <Loader/>
    }

    return (
        <>
            {!loading && <LinkList links={links}/>}
        </>
    )
}