/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './modal.scss';
import { Button } from '../../shared/button';
import { MODE_GAME, MODE_GAME_LANG } from './constants';
import { rgbToHex, hexToRgb, getKeyByValue } from './utils';
import { settingsDefault } from '../../../constants/globalConstants';

export class ModalSettings extends Component {
    constructor(props) {
        super(props);
        const {
            colorEnd, colorStart, wordCount, modeGame, modeLangGame,
        } = props.currentSettings;
        this.state = {
            colorEnd: rgbToHex(colorEnd),
            colorStart: rgbToHex(colorStart),
            wordCount,
            modeGame: getKeyByValue(MODE_GAME, modeGame),
            modeLangGame: getKeyByValue(MODE_GAME_LANG, modeLangGame),
        };
    }

    handlePropertyChange(target) {
        const state = {};
        const {
            name, value, max, min, type,
        } = target;
        switch (type) {
        case 'number':
            // eslint-disable-next-line no-nested-ternary
            state[name] = Number(value) > Number(min)
                ? (Number(value) < Number(max) ? value : max) : min;
            break;
        case 'color':
        default:
            state[name] = value;
        }

        this.setState(state);
    }

    handleOk() {
        const {
            colorEnd, colorStart, wordCount, modeGame, modeLangGame,
        } = this.state;
        this.props.ok({
            colorEnd: hexToRgb(colorEnd),
            colorStart: hexToRgb(colorStart),
            wordCount: Number(wordCount),
            modeGame: MODE_GAME[modeGame],
            modeLangGame: MODE_GAME_LANG[modeLangGame],
        });
    }

    handleReset() {
        const {
            colorEnd, colorStart, wordCount, modeGame, modeLangGame,
        } = JSON.parse(settingsDefault.optional.audioCall);
        this.setState({
            colorEnd: rgbToHex(colorEnd),
            colorStart: rgbToHex(colorStart),
            wordCount,
            modeGame: getKeyByValue(MODE_GAME, modeGame),
            modeLangGame: getKeyByValue(MODE_GAME_LANG, modeLangGame),
        });
    }

    render() {
        const {
            colorEnd, colorStart, wordCount, modeGame, modeLangGame,
        } = this.state;
        return (
            <div id="openModal" className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <Button className="close-modal close" onClick={this.props.close} title="×" />
                        </div>
                        <div className="modal-body">
                            <label className="modal-body__prop" htmlFor="mode">
                                Mode game:
                                <select
                                    value={modeGame}
                                    name="modeGame"
                                    title={"If the user's words are not enough, the mode with all words is automatically enabled"}
                                    onChange={(e) => this.handlePropertyChange(e.target)}
                                >
                                    {Object.keys(MODE_GAME)
                                        .map((o) => <option key={o}>{o}</option>)}
                                </select>
                            </label>
                            <label className="modal-body__prop" htmlFor="mode">
                                Translate game:
                                <select
                                    value={modeLangGame}
                                    name="modeLangGame"
                                    onChange={(e) => this.handlePropertyChange(e.target)}
                                >
                                    {Object.keys(MODE_GAME_LANG)
                                        .map((o) => <option key={o}>{o}</option>)}
                                </select>
                            </label>
                            <label className="modal-body__prop" htmlFor="wordCount">
                                Word in round:
                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    name="wordCount"
                                    value={wordCount}
                                    onChange={(e) => this.handlePropertyChange(e.currentTarget)}
                                />
                            </label>
                            <label className="modal-body__prop" htmlFor="colorStart">
                                Color start round:
                                <input
                                    type="color"
                                    name="colorStart"
                                    value={colorStart}
                                    onChange={(e) => this.handlePropertyChange(e.currentTarget)}
                                />
                            </label>
                            <label className="modal-body__prop" htmlFor="colorEnd">
                                Color end round:
                                <input
                                    type="color"
                                    name="colorEnd"
                                    value={colorEnd}
                                    onChange={(e) => this.handlePropertyChange(e.currentTarget)}
                                />
                            </label>
                        </div>
                        <div className="modal-buttons">
                            <Button className="close-modal-ok button" onClick={() => this.handleOk()} title="OK" />
                            <Button className="modal-reset button" onClick={() => this.handleReset()} toolTip="To set the default settings" title="reset" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ModalSettings.propTypes = {
    currentSettings: PropTypes.shape({
        colorEnd: PropTypes.shape({
            r: PropTypes.number.isRequired,
            g: PropTypes.number.isRequired,
            b: PropTypes.number.isRequired,
        }).isRequired,
        colorStart: PropTypes.shape({
            r: PropTypes.number.isRequired,
            g: PropTypes.number.isRequired,
            b: PropTypes.number.isRequired,
        }).isRequired,
        wordCount: PropTypes.number.isRequired,
        modeGame: PropTypes.number.isRequired,
        modeLangGame: PropTypes.number.isRequired,
    }).isRequired,
    ok: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
};
