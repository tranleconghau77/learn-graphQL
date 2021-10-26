import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { getBooks } from '../graphql-client/queries'
import BookDetails from './BookDetails'


const BookList = () => {
    const [bookSelected, setBookSelected] = useState(null)
    const { loading, error, data } = useQuery(getBooks)



    if (loading) return <p>Loading books...</p>
    if (error) return <p>Error loading books!</p>

    console.log(data.books)
    return (

        <Row xs={1} md={2} className="g-3">
            <Col xs={8} md={8} >
                <Row xs={3} md={2} lg={2} className="g-2">
                    {data.books.map((book) =>
                        <Card
                            border='info'
                            text='info'
                            className='text-center shadow'
                            key={book.id}
                            onClick={setBookSelected.bind(this, book.id)}>
                            <Card.Body>
                                {book.name}
                            </Card.Body>
                        </Card>

                    )}
                </Row>
            </Col>
            <Col xs={4} md={4}>
                <BookDetails bookId={bookSelected} />
            </Col>



        </Row>





    )
}

export default BookList
