import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { String as StringModel } from 'store/String';
import tonal from 'tonal';
import styled from 'styled-components';
import Tuner from './Tuner';
import Note from './Note';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 80px;
`;

const Fret = styled.div`
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid black;
`;

@observer
export default class String extends Component {
    static propTypes = {
        string: PropTypes.instanceOf(StringModel).isRequired,
        scale: PropTypes.instanceOf(tonal.Scale).isRequired,
    };

    renderNote = (semitones) => {
        const key = this.props.string.tuningKey + semitones + 8;
        const note = tonal.note.pc(
            tonal.note.simplify(
                tonal.note.fromMidi(key)
            )
        );

        return (
            <Fret key={semitones}>
                <Note
                    note={note}
                    scale={this.props.scale}
                />
            </Fret>
        );
    }

    renderNotes = () => {
        const notes = Array.apply(null, Array(22)).map((value, index) => index + 1);

        return notes.map((semitones) => this.renderNote(semitones));
    }

    handleDelete = () => {
        this.props.stringStore.remove(this.props.string);
    }

    render() {
        return (
            <Container>
                <Tuner
                    string={this.props.string}
                    onDelete={this.handleDelete}
                    scale={this.props.scale}
                />
                {this.renderNotes()}
            </Container>
        );
    }
}
