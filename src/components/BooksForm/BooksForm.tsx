import React, {FC, useEffect, useState} from 'react';
import styles from "./BooksForm.module.scss"
import MyInput from "../UI/inputs/MyInput/MyInput";
import AuthorsList from "../AuthorsList/AuthorsList";
import MyButton from "../UI/buttons/MyButton/MyButton";
import {Book} from "../../types/Book";

interface BooksFormProps {
    addBook: (book: Book) => void
}


const BooksForm: FC<BooksFormProps> = ({addBook}) => {
    const [name, setName] = useState<string>("")
    const [authors, setAuthors] = useState<string[]>([])
    const [year, setYear] = useState<number | null>(null)
    const [rate, setRate] = useState<number | null>(null)
    const [isbn, setIsbn] = useState<string | null>(null)

    const [isCorrectName, setIsCorrectName] = useState(false)
    const [isCorrectAuthors, setIsCorrectAuthors] = useState(false)
    const [isCorrectYear, setIsCorrectYear] = useState(true)
    const [isCorrectRate, setIsCorrectRate] = useState(true)
    const [isCorrectIsbn, setIsCorrectIsbn] = useState(true)

    let isCorrectFields = isCorrectName && isCorrectAuthors && isCorrectYear && isCorrectRate && isCorrectIsbn
    const onCreateBook = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        addBook(new Book(name, authors, year, rate || 0, isbn))


        setName("")
        setAuthors([])
        setYear(null)
        setRate(null)
        setIsbn(null)
        setIsCorrectAuthors(false)
        setIsCorrectName(false)
    }

    return (
        <form className={styles.form}>
            <MyInput
                value={name}
                placeholder="Name"
                warningMessage="Name can`t be empty or longer 100 symbols"
                checkCorrect={str => {let a = str !== "" && str.length <= 100; setIsCorrectName(a); return a}}
                onChange={e => setName(e.target.value)}/>
            <div style={{height: "15px"}}></div>
            <AuthorsList
                authors={authors}
                checkGlobalCorrect={(authors: string[] )=> {setIsCorrectAuthors(authors.length >= 0)}}
                onAdd={strings => setAuthors(strings)}/>
            <div style={{height: "15px"}}></div>
            <MyInput
                value={(year || "").toString()}
                placeholder="Year"
                warningMessage="Year can`t be not number or earlier than 1800"
                checkCorrect={str => {let a = !isNaN(+str) && +str >= 1800; setIsCorrectYear(a); return a }}
                onChange={e => setYear(+e.target.value)}/>
            <div style={{height: "15px"}}></div>
            <MyInput
                value={(rate || "").toString()}
                placeholder="Rate"
                warningMessage="Rate have to be number from 0 to 10"
                checkCorrect={str => {let a = !isNaN(+str)&& +str >= 0 && +str <= 10;setIsCorrectRate(a); return a}}
                onChange={e => setRate(+e.target.value)}/>
            <div style={{height: "15px"}}></div>
            <MyInput
                value={isbn || ""}
                placeholder="ISBN"
                warningMessage="ISBN have to be not empty string"
                checkCorrect={str => {let a = str !== ""; setIsCorrectIsbn(a); return a }}
                onChange={e => setIsbn(e.target.value)}/>
            <div style={{height: "30px"}}></div>
            <MyButton isDisabled={!isCorrectFields} onClick={onCreateBook}>Create book</MyButton>
        </form>
    );
};

export default BooksForm;