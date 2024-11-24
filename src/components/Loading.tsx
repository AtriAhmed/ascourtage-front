import React from 'react'
import './Loading.css'
import { IonContent, IonPage } from '@ionic/react'
import { motion } from "framer-motion"

export default function Loading({ type, height }: { type: string, height?: string }) {
    if (type == "page")
        return (
            <IonPage className='h-screen flex justify-center items-center bg-white'>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}
                    className='h-screen flex justify-center items-center bg-white'
                >
                    <span className="circles-loader"></span>
                </motion.div>
            </IonPage>
        )
    else
        return <div className={`${height} flex justify-center items-center bg-white`}>
            <span className="circles-loader"></span>
        </div>
}
