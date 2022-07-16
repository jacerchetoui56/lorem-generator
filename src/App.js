import "./styles.css";
import { useState } from "react";

export default function App() {
    const [number, setNumber] = useState(0);
    const [data, setData] = useState([]);
    const [display, setDispay] = useState(false);

    const fetchData = async (num) => {
        //!the number of paragraph should be between 1 and 8
        if (num === 0) num = 1
        const response = await fetch(
            `https://hipsum.co/api/?type=hipster-centric&paras=${num}`
        );
        const data = await response.json();
        setData(data);
    };

    function generateParagraph(e) {
        e.preventDefault()
        //* it is always recommended to put the fetch in try catch block
        try {
            fetchData(number);
        } catch (error) {
            console.log(error)
        }
        setDispay(true);
    }

    return (
        <div className="container">
            <h1 className="title">Tired of boring lorem Ipsum ?</h1>
            <div className="input-section">
                <span>Paragraphs : </span>
                <form onSubmit={generateParagraph}>
                    <input
                        type="number"
                        min={0}
                        max={8}
                        onChange={(e) => setNumber(e.target.value)}
                        value={number}
                    />
                    <button>Generate</button>
                </form>
            </div>
            {display && (
                <div className="paragraphs">
                    {data.map((paragraph) => {
                        return <p> {paragraph} </p>;
                    })}
                </div>
            )}
        </div>
    );
}
