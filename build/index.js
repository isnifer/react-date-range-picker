'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _momentRange = require('moment-range');

var _momentRange2 = _interopRequireDefault(_momentRange);

var _calendar = require('calendar');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _i18n = require('./i18n');

var calendar = new _calendar.Calendar(1);
var DEFAULT_HANDLER = function DEFAULT_HANDLER() {};

var WeekDay = (function (_React$Component) {
    function WeekDay() {
        _classCallCheck(this, WeekDay);

        _get(Object.getPrototypeOf(WeekDay.prototype), 'constructor', this).apply(this, arguments);
    }

    _inherits(WeekDay, _React$Component);

    _createClass(WeekDay, [{
        key: 'inRange',
        value: function inRange() {
            return this.props.range.contains(this.props.date);
        }
    }, {
        key: 'onClick',
        value: function onClick(e) {
            return this.inRange.call(this) ? this.props.onClick(this.props.date) : e.preventDefault();
        }
    }, {
        key: 'render',
        value: function render() {
            var className = (0, _classnames2['default'])('calendar__day', { calendar__day_available: this.inRange() }, { calendar__day_disabled: !this.inRange() }, { calendar__day_current: this.props.current });
            return _react2['default'].createElement(
                'td',
                { className: 'calendar__cell' },
                _react2['default'].createElement(
                    'span',
                    { className: className, onClick: this.onClick.bind(this) },
                    this.props.date.getDate()
                )
            );
        }
    }], [{
        key: 'propTypes',
        value: {
            date: _react2['default'].PropTypes.instanceOf(Date).isRequired,
            range: _react2['default'].PropTypes.object.isRequired,
            key: _react2['default'].PropTypes.number,
            onClick: _react2['default'].PropTypes.func.isRequired
        },
        enumerable: true
    }]);

    return WeekDay;
})(_react2['default'].Component);

var Datepicker = (function (_React$Component2) {
    function Datepicker(props) {
        _classCallCheck(this, Datepicker);

        _get(Object.getPrototypeOf(Datepicker.prototype), 'constructor', this).call(this, props);

        this.state = {
            date: null,
            month: null,
            range: null,
            year: null
        };
    }

    _inherits(Datepicker, _React$Component2);

    _createClass(Datepicker, [{
        key: 'componentWillMount',

        // Setting up default state of calendar
        value: function componentWillMount() {
            var TODAY = new Date();

            // If we have defined 'initialDate' prop
            // we will use it also for define month and year.
            // If not it will be TODAY
            var initialDate = this.props.initialDate || TODAY;
            var initialRange = this.props.range || new _momentRange2['default'](this.props.minimumDate, this.props.maximumDate);
            var state = undefined;

            state = {
                date: initialDate,
                month: initialDate.getMonth(),
                year: initialDate.getFullYear()
            };

            // Before set range to state we should check -
            // is range contains our initialDate.
            // If not, we will fire Error
            if (initialRange.contains(initialDate)) {
                state.range = initialRange;
            } else {
                throw new Error('Initial Range doesn\'t contains Initial Date');
            }

            this.setState(state);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.setState({
                range: props.range || new _momentRange2['default'](props.minimumDate, props.maximumDate)
            });
        }
    }, {
        key: 'changeMonth',

        /**
         * Change month handler
         * @param {Number} direction - "1" or "-1"
         */
        value: function changeMonth(direction) {
            var nextMonth = this.state.month + direction;
            var isMonthAvailable = nextMonth >= 0 && nextMonth <= 11;

            if (!isMonthAvailable) {
                this.setState({
                    month: direction === 1 ? 0 : 11,
                    year: this.state.year + direction
                });
            } else {
                this.setState({
                    month: this.state.month + direction
                });
            }
        }
    }, {
        key: 'onClick',

        /**
         * Calendar state setter
         * @param  {Date} date - выбранная дата
         */
        value: function onClick(date) {
            if (date) {
                this.setState({ date: date }, this.props.onClick(date));
            }
        }
    }, {
        key: 'renderMonth',
        value: function renderMonth() {
            var _this = this;

            // Array of weeks, which contains arrays of days
            // [[Date, Date, ...], [Date, Date, ...], ...]
            var month = calendar.monthDates(this.state.year, this.state.month);
            return month.map(function (week, i) {
                return _react2['default'].createElement(
                    'tr',
                    { className: 'calendar__week', key: i },
                    _this.renderWeek(week)
                );
            });
        }
    }, {
        key: 'renderWeek',

        /**
         * Render week
         * @param  {Array} weekDays - array of instanceof Date
         * @return {Array} - array of Components
         */
        value: function renderWeek(weekDays) {
            var _this2 = this;

            return weekDays.map(function (day, i) {
                var isCurrent = _this2.state.date.toDateString() === day.toDateString();
                return _react2['default'].createElement(WeekDay, {
                    key: i,
                    date: day,
                    range: _this2.state.range,
                    current: isCurrent,
                    onClick: _this2.onClick.bind(_this2) });
            });
        }
    }, {
        key: 'renderWeekdayNames',
        value: function renderWeekdayNames() {
            return _i18n.WEEK_NAMES[this.props.locale].map(function (weekname, i) {
                return _react2['default'].createElement(
                    'th',
                    { className: 'calendar__weekday-name', key: i },
                    weekname
                );
            });
        }
    }, {
        key: 'renderNavigation',
        value: function renderNavigation() {
            return _react2['default'].createElement(
                'span',
                { className: 'calendar__arrows' },
                _react2['default'].createElement(
                    'span',
                    {
                        className: 'calendar__arrow calendar__arrow_right',
                        onClick: this.changeMonth.bind(this, 1) },
                    '>>'
                ),
                _react2['default'].createElement(
                    'span',
                    {
                        className: 'calendar__arrow calendar__arrow_left',
                        onClick: this.changeMonth.bind(this, -1) },
                    '<<'
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2['default'].createElement(
                'div',
                { className: 'calendar' },
                _react2['default'].createElement(
                    'div',
                    { className: 'calendar__head clearfix' },
                    !this.props.disableNavigation && !this.props.outsideNavigation && this.renderNavigation(),
                    _react2['default'].createElement(
                        'span',
                        { className: 'calendar__month-name' },
                        _i18n.MONTH_NAMES[this.props.locale][this.state.month] + ', ' + this.state.year
                    )
                ),
                _react2['default'].createElement(
                    'table',
                    { className: 'calendar__month' },
                    _react2['default'].createElement(
                        'thead',
                        null,
                        _react2['default'].createElement(
                            'tr',
                            { className: 'calendar__week-names' },
                            this.renderWeekdayNames()
                        )
                    ),
                    _react2['default'].createElement(
                        'tbody',
                        null,
                        this.renderMonth()
                    )
                ),
                !this.props.disableNavigation && this.props.outsideNavigation && this.renderNavigation()
            );
        }
    }], [{
        key: 'propTypes',
        value: {
            onClick: _react2['default'].PropTypes.func,
            range: _react2['default'].PropTypes.instanceOf(_momentRange2['default']),
            disableNavigation: _react2['default'].PropTypes.bool,
            outsideNavigation: _react2['default'].PropTypes.bool,
            initialDate: _react2['default'].PropTypes.instanceOf(Date),
            locale: _react2['default'].PropTypes.string,
            minimumDate: _react2['default'].PropTypes.instanceOf(Date),
            maximumDate: _react2['default'].PropTypes.instanceOf(Date)
        },
        enumerable: true
    }, {
        key: 'defaultProps',
        value: {

            // Handler which will be execute when click on day
            onClick: DEFAULT_HANDLER,

            // Instance of DateRange
            range: null,

            // If true, navigation will be hidden
            disableNavigation: false,

            // If true, navigation will be in root container
            outsideNavigation: false,

            // Available locales: RU, EN, DE, FR, IT, POR, ESP
            locale: 'RU',

            // Minimum available date
            minimumDate: new Date(1970, 0, 1),

            // Maximum available date
            maximumDate: new Date(2100, 0, 1)
        },
        enumerable: true
    }]);

    return Datepicker;
})(_react2['default'].Component);

exports['default'] = Datepicker;
module.exports = exports['default'];