export default (sequelize, DataTypes) => {
  const Tariff = sequelize.define('Tariff', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minInvestment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxInvestment: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    name: {
      singular: 'tariff',
      plural: 'tariffs',
    },
  });
  Tariff.associate = () => {
    // associations can be defined here
  };
  return Tariff;
};
