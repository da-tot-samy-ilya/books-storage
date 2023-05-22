import React, {FC} from 'react';
import styles from "./BooksListItem.module.scss"
import {Book} from "../../../types/Book";
import remove from "./img/remove.svg"
interface BooksListItemProps {
    book: Book
    number: number
    removeBook: (id: number) => void
}
const BooksListItem: FC<BooksListItemProps>= ({book, number, removeBook}) => {
    return (
        <div className={styles.item}>
            <div className={styles.name}>{number+1}. {book.name}</div>
            <div className={styles.authors}>{book.authors.reduce((acc, next) => acc + ", " + next)}</div>
            <div className={styles.rate}>{book.rate}</div>
            <div className={styles.year}>{book.year || "-"}</div>
            <div className={styles.isbn}>{book.isbn || "-"}</div>
            <div onClick={() => removeBook(book.id)} className={styles.delete}><img src={remove} alt=""/></div>
        </div>
    );
};

export default BooksListItem;