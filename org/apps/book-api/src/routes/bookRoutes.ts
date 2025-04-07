import Router from 'express';
import books from '../data/books';
import {v4 as uuidv4} from 'uuid';
import book from '../types';
import { emitWarning } from 'process';

const router = Router()

router.get('/', getAllBooks)

router.post('/', createBook)

router.put('/:id', updateBook)

router.delete('/id', deleteBook)

function getAllBooks(req, res){
    try{
        res.status(200).json(books);
    } catch (err){
        res.status(500).json({ message: err.message })
    }
}

function createBook(req, res){
    const { title, author, year } = req.body; 
    if (!title || !author || !year){
        res.status(400).json({ message: "All title, author and year fields are required"});
    }
    try {
        const myuuid = uuidv4();
        const newBook: book = {
            "id": myuuid,
            "title": title,
            "author": author,
            "year": year
        }
        books.push(newBook)
    } catch (err){
        res.status(500).json({ message: err.message })
    }
}

function updateBook(req, res){
    
}

function deleteBook(req, res){
    const bookId = req.body.id;
    if(!bookId){
        res.status(400).json("The book Id is needed to complete the deletion")
    }
    const book = books.findIndex(b => b.id == bookId)
    if( book == -1){
        res.status(404).json("That book does not exist")
    } else {
        try{
            const newBooks = books.filter(b => b.id !== req.id)
            books = newBooks;
        }
    }
}