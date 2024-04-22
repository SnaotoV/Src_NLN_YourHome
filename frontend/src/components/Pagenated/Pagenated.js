import Pagination from 'react-bootstrap/Pagination';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { useEffect, useState } from "react";
let Pagenated = (props) => {
    let [page, setPage] = useState(1);
    let [listItem, setListItem] = useState([]);
    let [quantityPage, setQuantityPage] = useState(1);

    let handleClickPage = (pageEdit) => {
        let history = props.history;
        setPage(pageEdit)
        history.push(`${pageEdit}`)


    }
    let createListItem = async (lengthPage) => {
        let list = [];
        console.log(lengthPage);
        if (lengthPage < 6) {
            for (let i = 1; i <= lengthPage; i++) {
                let item = {
                    item: i,
                    active: page === i
                };
                list = [...list, item];
            }
        }
        else {
            list = [
                {
                    item: page <= 4 ? 1 : page >= lengthPage - 2 ? lengthPage - 4 : page - 2,
                    active: page === 1
                },
                {
                    item: page <= 4 ? 2 : page >= lengthPage - 2 ? lengthPage - 3 : page - 1,
                    active: page === 2
                },
                {
                    item: page <= 4 ? 3 : page >= lengthPage - 2 ? lengthPage - 2 : page,
                    active: page === 3 || page === lengthPage - 2 || (page > 4 && page < lengthPage - 2)
                },
                {
                    item: page <= 4 ? 4 : page >= lengthPage - 2 ? lengthPage - 1 : page + 1,
                    active: page === lengthPage - 1 || page === 4
                },
                {
                    item: page <= 4 ? 5 : page >= lengthPage - 2 ? lengthPage : page + 2,
                    active: page === lengthPage
                },
            ]
        }
        return list;
    }
    useEffect(() => {
        let setup = async () => {
            let quantityPageData = props.quantityPage.quantityPage;
            setQuantityPage(quantityPage);
            let list = await createListItem(quantityPageData);
            setListItem(list)
            let pageClone = Number(props.match.params.page);
            setPage(pageClone);
        }
        setup();
    }, [props.quantityPage, props.match.params.page])
    return (
        <>
            <Pagination className={props.className}>
                <Pagination.First onClick={() => handleClickPage(1)} />
                <Pagination.Prev onClick={() => handleClickPage((page > 1 ? page - 1 : page))} />


                <Pagination.Item onClick={() => handleClickPage(1)}>Trang đầu</Pagination.Item>
                <Pagination.Ellipsis />

                {listItem && listItem.map((item, index) => {

                    return (

                        <Pagination.Item onClick={() => handleClickPage(item.item)} key={index} active={item.active}>{item.item}</Pagination.Item>

                    )
                })
                }




                <Pagination.Ellipsis />
                <Pagination.Item onClick={() => handleClickPage(quantityPage)}>Trang cuối</Pagination.Item>

                <Pagination.Next onClick={() => handleClickPage((page < quantityPage ? page + 1 : page))} />
                <Pagination.Last onClick={() => handleClickPage(quantityPage)} />
            </Pagination >
        </>
    )
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagenated));