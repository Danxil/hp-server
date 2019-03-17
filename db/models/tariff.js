export default (sequelize, DataTypes) => {
  const Tariff = sequelize.define('Tariff', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minReplenishment: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minCredit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxCredit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minReliability: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxReliability: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    percentage: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    insurance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
