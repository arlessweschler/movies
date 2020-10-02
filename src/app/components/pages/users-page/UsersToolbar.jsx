import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export default function UsersToolbar({ handleLoad, handleClear }) {
  return (
    <ButtonGroup className="pb-4">
      <Button className="btn-success"
        onClick={handleLoad}
      >
        Загрузить список
      </Button>

      <Button className="btn-warning"
        onClick={handleClear}
      >
        Очистить список
      </Button>
    </ButtonGroup>
  );
}