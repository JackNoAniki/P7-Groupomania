import { useState } from 'react'

function Publish() {

    const [publish, setPublish] = useState('')
    
    return (
        <div className="publishContainer">
            <h2>Publier un post</h2>
            <label htmlfor="postPublish">Quel est le sujet du jour ?</label>
            <textarea id="subject" name="subject" rows="8" cols="100" >
            </textarea>

            <label htmlFor="image">Ajouter une image</label>
            <input type="file" id="image" name="image" accept="image/png, image/jpg, image/jpeg" />

            <button className="publishButton">Publier</button>
        </div>
    )
}

export default Publish