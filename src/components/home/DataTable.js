import React, { useState } from "react";
import { AiFillApple, AiFillAndroid } from "react-icons/ai";
import ReactPaginate from "react-paginate";

const DataTable = ({ gridData, itemsPerPage = 10, entryCount, firstDate, lastDate }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + entryCount;
  const currentItems = gridData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(gridData.length / entryCount);

  const handlePageClick = (event) => {
    const newOffset = event.selected * entryCount;
    setItemOffset(newOffset);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>day installs</th>
            <th>plateform</th>
            <th>day uninstalls</th>
            <th>plateform</th>
            <th>churn Rate</th>
            <th>churn plateform</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, id) => {
            const d = new Date(item.created_At);
            const ye = new Intl.DateTimeFormat("en", {
              year: "numeric",
            }).format(d);
            const mo = new Intl.DateTimeFormat("en", { month: "short" }).format(
              d
            );
            const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
              d
            );
            const newCreatedDate = `${da} ${mo} ${ye}`;
            return (
              <tr key={id}>
                <td>{newCreatedDate}</td>
                <td>{item.totalinstall}</td>
                <td>
                  <p>
                    <span>
                      <AiFillApple /> {item.ios_install}
                    </span>
                    <span>
                      <AiFillAndroid /> {item.android_install}
                    </span>
                  </p>
                </td>
                <td>{item.totaluninstall}</td>
                <td>
                  <p>
                    <span>
                      <AiFillApple /> {item.ios_uninstall}
                    </span>
                    <span>
                      <AiFillAndroid /> {item.android_uninstall}
                    </span>
                  </p>
                </td>
                <td>{item.totalchurn}%</td>
                <td>
                  <p>
                    <span>
                      <AiFillApple /> {item.ios_churn}%
                    </span>
                    <span>
                      <AiFillAndroid /> {item.android_churn}%
                    </span>
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {gridData.length === 0 && (
        <h3 className="no__data__warning">
          No Data Found in date Range from <span>{firstDate}</span> to{" "}
          <span>{lastDate}</span>.
        </h3>
      )}

      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="prev"
        renderOnZeroPageCount={null}
        marginLeft="2"
        className="pagination__container"
      />
    </>
  );
};

export default DataTable;
